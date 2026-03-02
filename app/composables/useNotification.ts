export const useNotification = () => {
  const toast = useToast()

  const showError = (message: string) => {
    toast.add({
      title: 'Lỗi',
      description: message,
      color: 'error',
      icon: 'i-lucide-circle-x'
    })
  }

  const showSuccess = (message: string) => {
    toast.add({
      title: 'Thành công',
      description: message,
      color: 'success',
      icon: 'i-lucide-circle-check'
    })
  }

  return {
    showError,
    showSuccess
  }
}
