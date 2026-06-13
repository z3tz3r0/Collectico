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
  password: string
  [key: string]: unknown
}

export interface ResetPasswordPayload {
  email: string
  [key: string]: unknown
}
