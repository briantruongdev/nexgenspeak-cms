import { storeToRefs } from 'pinia'
import type { IFormLogin } from '~/schemas/auth.schema'
import { apiAuth } from '~/services'
import { useAuthStore } from '~/stores/auth.store'

export const useAuth = () => {
  const { showSuccess, showError } = useNotification()
  const { accessTokenCookie, email } = storeToRefs(useAuthStore())

  const isProcessing = ref(false)
  const formLogin = ref<IFormLogin>({
    email: '',
    password: ''
  })
  const canLogin = computed(() => formLogin.value.email && formLogin.value.password)

  const handleLogin = async () => {
    try {
      isProcessing.value = true

      const data = await apiAuth.login(formLogin.value)
      showSuccess(data.message)
      accessTokenCookie.value = data.token
      email.value = data.user.email

      formLogin.value = {
        email: '',
        password: ''
      }
      navigateTo('/')
    } catch (error) {
      console.error(error)
      showError('Đăng nhập không thành công. Vui lòng kiểm tra lại email hoặc mật khẩu.')
    } finally {
      isProcessing.value = false
    }
  }

  const handleLogout = () => {
    accessTokenCookie.value = null
    email.value = ''
    navigateTo('/')
  }

  return {
    isProcessing,
    formLogin,
    canLogin,
    handleLogin,
    handleLogout
  }
}
