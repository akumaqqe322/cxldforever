import { useState, useEffect, useRef, useCallback } from 'react';
import { LanyardData } from '../types';

const LANYARD_WS = 'wss://api.lanyard.rest/socket';
const LANYARD_REST = 'https://api.lanyard.rest/v1/users';

const DEFAULT_FALLBACK_USER = {
  id: '373840651600789504',
  username: 'cxldforever',
  avatar: null,
  discriminator: '0',
  bot: false,
  global_name: 'cxldforever',
  avatar_decoration: null,
  display_name: 'cxldforever',
  public_flags: 0,
};

export interface NormalizedSpotify {
  song: string;
  artist: string;
  albumArt: string;
  album_art_url: string;
  album?: string;
  track_id?: string | null;
}

export function useLanyard(userId: string = '373840651600789504') {
  const [data, setData] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const wsRef = useRef<WebSocket | null>(null);
  const heartbeatIntervalRef = useRef<number | null>(null);
  const fallbackPollIntervalRef = useRef<number | null>(null);
  const isMountedRef = useRef<boolean>(true);

  // REST fetcher
  const fetchRestData = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await fetch(`${LANYARD_REST}/${userId}`);
      if (res.ok) {
        const json = await res.json();
        if (isMountedRef.current && json.success && json.data) {
          setData(json.data);
          setLoading(false);
          setError(false);
        }
      }
    } catch {
      // Ignore network errors in REST fallback
    }
  }, [userId]);

  // Start REST fallback polling
  const startFallbackPolling = useCallback(() => {
    if (fallbackPollIntervalRef.current) return;
    fallbackPollIntervalRef.current = window.setInterval(() => {
      fetchRestData();
    }, 4000);
  }, [fetchRestData]);

  // Stop REST fallback polling
  const stopFallbackPolling = useCallback(() => {
    if (fallbackPollIntervalRef.current) {
      clearInterval(fallbackPollIntervalRef.current);
      fallbackPollIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;

    if (!userId) {
      setLoading(false);
      return;
    }

    // 1. Immediate REST fetch on mount
    fetchRestData();

    // 2. WebSocket setup with Heartbeat & Auto-reconnect
    let reconnectTimeout: number | null = null;

    function connectWebSocket() {
      if (!isMountedRef.current) return;

      try {
        const ws = new WebSocket(LANYARD_WS);
        wsRef.current = ws;

        ws.onopen = () => {
          stopFallbackPolling();
        };

        ws.onmessage = (event) => {
          try {
            const payload = JSON.parse(event.data);
            const { op, d, t } = payload;

            // Opcode 1: Hello (sets up heartbeat and subscription)
            if (op === 1) {
              const heartbeatInterval = d.heartbeat_interval;

              // Send Opcode 2: Subscribe
              if (ws.readyState === WebSocket.OPEN) {
                ws.send(
                  JSON.stringify({
                    op: 2,
                    d: {
                      subscribe_to_id: userId,
                    },
                  })
                );
              }

              // Start Heartbeat Opcode 3
              if (heartbeatIntervalRef.current) {
                clearInterval(heartbeatIntervalRef.current);
              }

              heartbeatIntervalRef.current = window.setInterval(() => {
                if (ws.readyState === WebSocket.OPEN) {
                  ws.send(JSON.stringify({ op: 3 }));
                }
              }, heartbeatInterval);
            }

            // Opcode 0: Event Dispatch (INIT_STATE or PRESENCE_UPDATE)
            if (op === 0) {
              if (t === 'INIT_STATE' || t === 'PRESENCE_UPDATE') {
                if (isMountedRef.current && d) {
                  setData(d);
                  setLoading(false);
                  setError(false);
                }
              }
            }
          } catch {
            // Safe JSON parse failover
          }
        };

        ws.onerror = () => {
          if (isMountedRef.current) {
            setError(true);
            startFallbackPolling();
          }
        };

        ws.onclose = () => {
          if (heartbeatIntervalRef.current) {
            clearInterval(heartbeatIntervalRef.current);
            heartbeatIntervalRef.current = null;
          }
          if (isMountedRef.current) {
            startFallbackPolling();
            // Attempt reconnect after 5 seconds
            reconnectTimeout = window.setTimeout(() => {
              connectWebSocket();
            }, 5000);
          }
        };
      } catch {
        if (isMountedRef.current) {
          setError(true);
          startFallbackPolling();
        }
      }
    }

    connectWebSocket();

    return () => {
      isMountedRef.current = false;
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
        heartbeatIntervalRef.current = null;
      }
      if (fallbackPollIntervalRef.current) {
        clearInterval(fallbackPollIntervalRef.current);
        fallbackPollIntervalRef.current = null;
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
    };
  }, [userId, fetchRestData, startFallbackPolling, stopFallbackPolling]);

  // Safe Avatar URL builder with GIF/PNG support
  const getAvatarUrl = (): string | null => {
    if (data?.discord_user?.id && data?.discord_user?.avatar) {
      const isGif = data.discord_user.avatar.startsWith('a_');
      const ext = isGif ? 'gif' : 'png';
      return `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.${ext}?size=256`;
    }
    return null;
  };

  const status = data?.discord_status || 'offline';
  const isOnline = status === 'online';
  const isDnd = status === 'dnd';
  const isIdle = status === 'idle';
  const isListeningToSpotify = Boolean(data?.listening_to_spotify && data?.spotify);

  const spotify: NormalizedSpotify | null = isListeningToSpotify && data?.spotify ? {
    song: data.spotify.song,
    artist: data.spotify.artist,
    albumArt: data.spotify.album_art_url,
    album_art_url: data.spotify.album_art_url,
    album: data.spotify.album,
    track_id: data.spotify.track_id,
  } : null;

  return {
    data,
    loading,
    error,
    status,
    isOnline,
    isDnd,
    isIdle,
    isListeningToSpotify,
    spotify,
    avatarUrl: getAvatarUrl(),
    discordUser: data?.discord_user || DEFAULT_FALLBACK_USER,
  };
}
