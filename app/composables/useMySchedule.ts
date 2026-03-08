import { apiCmsTeacher } from '~/services'
import type { MyScheduleResponse } from '~/types/teacher.type'

export const useMySchedule = () => {
  const scheduleData = ref<MyScheduleResponse>()
  const isLoading = ref(false)

  // Current month range
  const currentDate = ref(new Date())

  const currentMonth = computed(() => currentDate.value.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' }))

  const dateRange = computed(() => {
    const d = currentDate.value
    const start = new Date(d.getFullYear(), d.getMonth(), 1)
    const end = new Date(d.getFullYear(), d.getMonth() + 1, 0)
    return {
      startDate: formatISODate(start),
      endDate: formatISODate(end)
    }
  })

  function formatISODate(d: Date): string {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  }

  const fetchSchedule = async () => {
    isLoading.value = true
    try {
      const { startDate, endDate } = dateRange.value
      scheduleData.value = await apiCmsTeacher.getMySchedule(startDate, endDate)
    } catch (err) {
      console.error('Failed to fetch schedule:', err)
    } finally {
      isLoading.value = false
    }
  }

  const prevMonth = () => {
    const d = currentDate.value
    currentDate.value = new Date(d.getFullYear(), d.getMonth() - 1, 1)
    fetchSchedule()
  }

  const nextMonth = () => {
    const d = currentDate.value
    currentDate.value = new Date(d.getFullYear(), d.getMonth() + 1, 1)
    fetchSchedule()
  }

  // Group slots by date
  const groupByDate = (slots: MyScheduleResponse['schedule']['available']) => {
    const map = new Map<string, typeof slots>()
    for (const s of slots) {
      const arr = map.get(s.date) || []
      arr.push(s)
      map.set(s.date, arr)
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b))
  }

  const availableByDate = computed(() => groupByDate(scheduleData.value?.schedule.available ?? []))

  const upcomingByDate = computed(() => groupByDate(scheduleData.value?.schedule.upcoming ?? []))

  const completedByDate = computed(() => groupByDate(scheduleData.value?.schedule.completed ?? []))

  const summary = computed(() => scheduleData.value?.summary)

  const formatDateLabel = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  return {
    scheduleData,
    isLoading,
    currentDate,
    currentMonth,
    dateRange,
    summary,
    availableByDate,
    upcomingByDate,
    completedByDate,
    prevMonth,
    nextMonth,
    fetchSchedule,
    formatDateLabel
  }
}
