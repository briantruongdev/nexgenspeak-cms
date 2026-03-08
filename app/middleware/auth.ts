import { useAuthStore } from '~/stores/auth.store'

export default defineNuxtRouteMiddleware((to, _from) => {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated) {
    return navigateTo('/login')
  }

  if (authStore.role === 'teacher' && to.path === '/') {
    return navigateTo('/my-schedule')
  }
})
