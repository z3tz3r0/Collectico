import {
  loginRequest,
  logoutRequest,
  registerRequest,
  resetPasswordRequest,
  verifyTokenRequest,
} from '../api/auth'
import type { AuthUser, LoginCredentials, RegisterPayload, ResetPasswordPayload } from './types'

// FSD entities/user model: the Pinia auth store. Replaces the legacy React AuthContext.
export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)
  const isAuthenticated = ref(false)
  const loading = ref(true)
  const isLoginPopupOpen = ref(false)

  function setSession(next: AuthUser | null) {
    user.value = next
    isAuthenticated.value = next !== null
  }

  // Session bootstrap: GET verify-token. Sets the session on success, clears it on failure.
  async function verifyToken() {
    try {
      setSession(await verifyTokenRequest())
    } catch {
      setSession(null)
    } finally {
      loading.value = false
    }
  }

  async function login(credentials: LoginCredentials) {
    const next = await loginRequest(credentials)
    setSession(next)
    closeLoginPopup()
    return next
  }

  async function register(payload: RegisterPayload) {
    await registerRequest(payload)
  }

  async function resetPassword(payload: ResetPasswordPayload) {
    await resetPasswordRequest(payload)
  }

  async function logout() {
    try {
      await logoutRequest()
    } finally {
      setSession(null)
      await navigateTo('/')
    }
  }

  function openLoginPopup() {
    isLoginPopupOpen.value = true
  }
  function closeLoginPopup() {
    isLoginPopupOpen.value = false
  }

  return {
    user,
    isAuthenticated,
    loading,
    isLoginPopupOpen,
    verifyToken,
    login,
    register,
    resetPassword,
    logout,
    openLoginPopup,
    closeLoginPopup,
  }
})
