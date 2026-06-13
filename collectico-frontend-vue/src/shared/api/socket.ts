import { io, type Socket } from 'socket.io-client'

// FSD shared/api: a lazily-created, client-only socket.io singleton for realtime features (bidding).
// Sockets are browser-only, so this returns null on the server and callers must null-guard. The
// module-scope singleton is safe because it is never created during SSR (import.meta.client guard),
// so it cannot leak across concurrent server requests.
let socket: Socket | null = null

export function useSocket(): Socket | null {
  if (import.meta.server) return null
  if (!socket) {
    const apiBase = useRuntimeConfig().public.apiBase as string
    // Empty apiBase means same-origin. withCredentials sends the auth cookie on the handshake.
    socket = io(apiBase || undefined, { withCredentials: true })
  }
  return socket
}
