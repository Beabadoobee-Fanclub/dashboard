import { SocketManager } from "$lib/socket_manager";
import type { APIPartialGuild, APIUser } from "discord-api-types/v10";
export const socketConnection = $state(new SocketManager());
export const guildsState = $state<APIPartialGuild[]>([]);
export const userState = $state<{ discord: APIUser | null }>({
  discord: null,
});
