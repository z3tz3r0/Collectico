import { apiPaths, useApi } from '@/shared/api/http-client'
import type { AuthUser, LoginCredentials, RegisterPayload, ResetPasswordPayload } from '../model/types'

// The backend returns the user fields directly, and may return a 200 body carrying { error, message } on a soft failure.
interface LoginResponse {
  error?: boolean
  message?: string
  _id?: string
  email?: string
  firstName?: string
  lastName?: string
}

export async function loginRequest(credentials: LoginCredentials): Promise<AuthUser> {
  const data = await useApi()<LoginResponse>(apiPaths.auth.login, { method: 'POST', body: credentials })
  if (data?.error || !data?._id) {
    throw new Error(data?.message || 'Login failed')
  }
  return {
    id: data._id,
    email: data.email ?? credentials.email,
    firstName: data.firstName,
    lastName: data.lastName,
  }
}

export async function registerRequest(payload: RegisterPayload): Promise<void> {
  await useApi()(apiPaths.auth.register, { method: 'POST', body: payload })
}

export async function resetPasswordRequest(payload: ResetPasswordPayload): Promise<void> {
  await useApi()(apiPaths.auth.resetPassword, { method: 'POST', body: payload })
}

export async function logoutRequest(): Promise<void> {
  await useApi()(apiPaths.auth.logout, { method: 'POST' })
}

export async function verifyTokenRequest(): Promise<AuthUser> {
  const data = await useApi()<{ user: AuthUser }>(apiPaths.auth.verifyToken)
  return data.user
}
