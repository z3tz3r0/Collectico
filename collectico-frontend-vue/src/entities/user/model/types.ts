// FSD entities/user model: auth domain types.
export interface AuthUser {
  id: string
  email: string
  firstName?: string
  lastName?: string
  [key: string]: unknown
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterPayload {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  isArtist: boolean
  artistName?: string
  artistDescription?: string
  [key: string]: unknown
}

export interface RequestResetPayload {
  email: string
  [key: string]: unknown
}

export interface ResetPasswordPayload {
  email: string
  // New password. The reset flow PATCHes { email, password, token }, where token comes from the
  // emailed reset link query string and gates the change server-side (anti-enumeration / expiry).
  password: string
  token: string
  [key: string]: unknown
}
