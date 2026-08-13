export interface LanyardSpotify {
  track_id: string | null;
  timestamps: {
    start: number;
    end: number;
  };
  song: string;
  artist: string;
  album_art_url: string;
  album: string;
}

export interface LanyardDiscordUser {
  id: string;
  username: string;
  avatar: string | null;
  discriminator: string;
  bot: boolean;
  global_name: string | null;
  avatar_decoration: string | null;
  display_name: string | null;
  public_flags: number;
}

export interface LanyardActivity {
  type: number;
  state?: string;
  name: string;
  id: string;
  details?: string;
  created_at: number;
  assets?: {
    large_text?: string;
    large_image?: string;
    small_text?: string;
    small_image?: string;
  };
  timestamps?: {
    start?: number;
    end?: number;
  };
}

export interface LanyardData {
  spotify: LanyardSpotify | null;
  listening_to_spotify: boolean;
  discord_user: LanyardDiscordUser;
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  activities: LanyardActivity[];
  active_on_discord_web: boolean;
  active_on_discord_mobile: boolean;
  active_on_discord_desktop: boolean;
}
