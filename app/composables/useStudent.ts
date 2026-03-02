import { apiStudent } from '~/services'

export const useStudent = () => {
  const { data, pending, error, refresh } = useAsyncData('students', () => apiStudent.getAllStudents(), {
    server: false
  })
  const listStudents = computed(() => data.value?.students)

  return { data, pending, error, refresh, listStudents }
}
