import { apiStudent } from '~/services'
import type { StudentScheduleResponse } from '~/types/student.type'

const isProcessing = ref(false)
const studentSchedule = ref<StudentScheduleResponse>()
export const useStudent = () => {
  const isScheduleModalVisible = useState<boolean>('student-schedule-modal', () => false)

  const { data, pending, error, refresh } = useAsyncData('students', () => apiStudent.getAllStudents(), {
    server: false
  })
  const listStudents = computed(() => data.value?.students)
  const getSchedule = async (teacherId: string) => {
    isProcessing.value = true
    try {
      const rs = await apiStudent.getScheduleById(teacherId)
      studentSchedule.value = rs
    } catch (error) {
      console.log(error)
    } finally {
      isProcessing.value = false
    }
  }
  return { data, pending, error, refresh, listStudents, isScheduleModalVisible, getSchedule, isProcessing, studentSchedule }
}
