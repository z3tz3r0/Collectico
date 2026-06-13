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

export interface ResetPasswordPayload {
  email: string
  // New password. The legacy React reset flow PATCHes { email, password }.
  password: string
  [key: string]: unknown
}
