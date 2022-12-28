declare global {
  // eslint-disable-next-line no-var
  var twitch_token: string | undefined;
}

export interface OfflineResponse {
  online: false;
  user_name: string;
}
export interface OnlineResponse {
  online: true;
  game_name: string;
  user_name: string;
  viewer_count: string | number;
}

export interface ErrorResponse {
  online: false;
  message: string;
}
