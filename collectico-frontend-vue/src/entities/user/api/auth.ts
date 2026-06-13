import { apiPaths, useApi } from '@/shared/api/http-client'
import type {
  AuthUser,
  LoginCredentials,
  RegisterPayload,
  RequestResetPayload,
  ResetPasswordPayload,
} from '../model/types'

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

export async function requestResetRequest(payload: RequestResetPayload): Promise<void> {
  // Step one of the email reset flow: ask the backend to send a tokenized reset link. The response
  // is intentionally generic (anti-enumeration), so any 2xx is treated as success by the caller.
  await useApi()(apiPaths.auth.requestReset, { method: 'POST', body: payload })
}

export async function resetPasswordRequest(payload: ResetPasswordPayload): Promise<void> {
  // PATCH to match the legacy React contract (api.patch on the resetpassword endpoint). The payload
  // now carries the token read from the emailed reset link, which the backend validates server-side.
  await useApi()(apiPaths.auth.resetPassword, { method: 'PATCH', body: payload })
}

export async function logoutRequest(): Promise<void> {
  await useApi()(apiPaths.auth.logout, { method: 'POST' })
}

export async function verifyTokenRequest(): Promise<AuthUser> {
  const data = await useApi()<{ user: AuthUser }>(apiPaths.auth.verifyToken)
  return data.user
}
