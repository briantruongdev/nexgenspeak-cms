<script setup lang="ts">
import type { StudentScheduleSlot } from '~/types/student.type'

const { isScheduleModalVisible, studentSchedule, isProcessing } = useStudent()

const tabs = computed(() => [
  {
    label: 'Hôm nay',
    slot: 'today' as const,
    badge: studentSchedule.value?.schedule.today.length ?? 0
  },
  {
    label: 'Sắp tới',
    slot: 'upcoming' as const,
    badge: studentSchedule.value?.schedule.upcoming.length ?? 0
  },
  {
    label: 'Đã hoàn thành',
    slot: 'completed' as const,
    badge: studentSchedule.value?.schedule.completed.length ?? 0
  }
])

const summary = computed(() => [
  {
    label: 'Hôm nay',
    slots: studentSchedule.value?.summary.totalTodaySlots ?? 0,
    hours: studentSchedule.value?.summary.totalTodayHours ?? 0,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    icon: 'i-lucide-calendar-days'
  },
  {
    label: 'Sắp tới',
    slots: studentSchedule.value?.summary.totalUpcomingSlots ?? 0,
    hours: studentSchedule.value?.summary.totalUpcomingHours ?? 0,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    icon: 'i-lucide-clock'
  },
  {
    label: 'Đã hoàn thành',
    slots: studentSchedule.value?.summary.totalCompletedSlots ?? 0,
    hours: studentSchedule.value?.summary.totalCompletedHours ?? 0,
    color: 'text-green-500',
    bg: 'bg-green-50',
    icon: 'i-lucide-circle-check-big'
  }
])

const statusConfig: Record<StudentScheduleSlot['status'], { label: string; color: 'success' | 'warning' | 'primary' }> = {
  completed: { label: 'Hoàn thành', color: 'success' },
  upcoming: { label: 'Sắp tới', color: 'warning' },
  today: { label: 'Hôm nay', color: 'primary' }
}

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('vi-VN', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' })
</script>

<template>
  <UModal
    v-model:open="isScheduleModalVisible"
    :title="studentSchedule?.student.email ?? 'Lịch học'"
    :description="`Slot/ngày: ${studentSchedule?.student.slotAvailablePerDay ?? 0}`"
    class="w-2/3"
    :ui="{ close: 'hover:cursor-pointer' }"
  >
    <template #body>
      <!-- Loading -->
      <div v-if="isProcessing" class="h-64 flex justify-center items-center">
        <div class="flex flex-col items-center space-y-4">
          <UIcon name="i-lucide-loader" class="animate-spin size-10 text-primary" />
          <span class="text-gray-500 animate-pulse">Đang tải lịch học...</span>
        </div>
      </div>

      <div v-else-if="studentSchedule" class="space-y-5">
        <!-- Summary cards -->
        <div class="grid grid-cols-3 gap-3">
          <div v-for="item in summary" :key="item.label" class="rounded-xl p-4 flex items-center gap-3" :class="item.bg">
            <div class="p-2 rounded-lg bg-white/70">
              <UIcon :name="item.icon" class="size-5" :class="item.color" />
            </div>
            <div>
              <p class="text-xs text-gray-500">{{ item.label }}</p>
              <p class="font-bold text-lg" :class="item.color">{{ item.slots }} slot</p>
              <p class="text-xs text-gray-400">{{ item.hours }} giờ</p>
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <UTabs :items="tabs" variant="link">
          <template #today>
            <UiStudentScheduleTable
              :rows="studentSchedule.schedule.today"
              :status-config="statusConfig"
              :format-date="formatDate"
            />
          </template>
          <template #upcoming>
            <UiStudentScheduleTable
              :rows="studentSchedule.schedule.upcoming"
              :status-config="statusConfig"
              :format-date="formatDate"
            />
          </template>
          <template #completed>
            <UiStudentScheduleTable
              :rows="studentSchedule.schedule.completed"
              :status-config="statusConfig"
              :format-date="formatDate"
            />
          </template>

          <template #trailing="{ item }">
            <div class="flex items-center gap-2">
              <UBadge :label="String(item.badge)" variant="subtle" size="sm" :color="item.badge > 0 ? 'primary' : 'neutral'" />
            </div>
          </template>
        </UTabs>
      </div>
    </template>
  </UModal>
</template>

<style scoped></style>
