import { apiTeacher } from '~/services'
import type { IResponseSlots, ISlots, TeacherScheduleResponse } from '~/types/teacher.type'

const slots = ref<ISlots[]>([])
const isGettingSlots = ref(false)
const isProcessing = ref(false)
const isFetchingTeacherDetail = ref(false)
const teacherSchedule = ref<TeacherScheduleResponse>()

export const useTeacher = () => {
  const dataSlots = ref<IResponseSlots>()
  const isScheduleModalVisible = useState<boolean>('teacher-schedule-modal', () => false)

  const { data, pending, error, refresh } = useAsyncData('teachers', () => apiTeacher.getAllTeachers(), {
    server: false
  })
  const listTeachers = computed(() => data.value?.teachers)

  const getSlotByDate = async (teacherId: string, date: string) => {
    isGettingSlots.value = true
    try {
      const rs = await apiTeacher.getSlots(teacherId, date)
      dataSlots.value = rs
      slots.value = rs.slots.filter(s => s.isAvailable)
    } catch (error) {
      console.log(error)
    } finally {
      isGettingSlots.value = false
    }
  }
  const getSchedule = async (teacherId: string) => {
    isProcessing.value = true
    try {
      const rs = await apiTeacher.getScheduleById(teacherId)
      teacherSchedule.value = rs
    } catch (error) {
      console.log(error)
    } finally {
      isProcessing.value = false
    }
  }

  return {
    data,
    pending,
    error,
    dataSlots,
    isGettingSlots,
    slots,
    isProcessing,
    isFetchingTeacherDetail,
    listTeachers,
    teacherSchedule,
    isScheduleModalVisible,
    refresh,
    getSlotByDate,
    getSchedule
  }
}
export const useTeacherDetail = (teacherId: MaybeRef<string>) => {
  const id = toRef(teacherId)

  const { data, pending, refresh } = useAsyncData(
    () => `teacher-${id.value}`,
    () => apiTeacher.getTeacherById(id.value),
    {
      server: true,
      watch: [id]
    }
  )

  const teacherDetail = computed(() => data.value?.teacher)

  return {
    teacherDetail,
    isFetchingTeacherDetail: pending,
    refreshTeacher: refresh
  }
}
