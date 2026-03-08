<script setup lang="ts">
import type { ScheduleSlot } from '~/types/teacher.type'

const { isScheduleModalVisible, teacherSchedule, isProcessing, getSchedule } = useTeacher()

const tabs = computed(() => [
  {
    label: 'Hôm nay',
    slot: 'today' as const,
    badge: teacherSchedule.value?.schedule.today.length ?? 0
  },
  {
    label: 'Sắp tới',
    slot: 'upcoming' as const,
    badge: teacherSchedule.value?.schedule.upcoming.length ?? 0
  },
  {
    label: 'Đã hoàn thành',
    slot: 'completed' as const,
    badge: teacherSchedule.value?.schedule.completed.length ?? 0
  }
])

const summary = computed(() => [
  {
    label: 'Hôm nay',
    slots: teacherSchedule.value?.summary.totalTodaySlots ?? 0,
    hours: teacherSchedule.value?.summary.totalTodayHours ?? 0,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    icon: 'i-lucide-calendar-days'
  },
  {
    label: 'Sắp tới',
    slots: teacherSchedule.value?.summary.totalUpcomingSlots ?? 0,
    hours: teacherSchedule.value?.summary.totalUpcomingHours ?? 0,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    icon: 'i-lucide-clock'
  },
  {
    label: 'Đã hoàn thành',
    slots: teacherSchedule.value?.summary.totalCompletedSlots ?? 0,
    hours: teacherSchedule.value?.summary.totalCompletedHours ?? 0,
    color: 'text-green-500',
    bg: 'bg-green-50',
    icon: 'i-lucide-circle-check-big'
  }
])

const statusConfig: Record<ScheduleSlot['status'], { label: string; color: 'success' | 'warning' | 'primary' }> = {
  completed: { label: 'Hoàn thành', color: 'success' },
  upcoming: { label: 'Sắp tới', color: 'warning' },
  today: { label: 'Hôm nay', color: 'primary' }
}

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('vi-VN', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' })

const filters = ref('all')
const FILTERS = [
  {
    label: 'Tất cả',
    value: 'all'
  },
  {
    label: 'Tháng này',
    value: 'this-month'
  },
  {
    label: 'Tháng trước',
    value: 'last-month'
  }
]
</script>

<template>
  <UModal
    v-model:open="isScheduleModalVisible"
    :title="teacherSchedule?.teacher.fullName ?? 'Lịch giảng dạy'"
    :description="teacherSchedule?.teacher.position"
    class="w-2/3"
    :ui="{ close: 'hover:cursor-pointer' }"
  >
    <template #body>
      <!-- Loading -->
      <div v-if="isProcessing" class="h-64 flex justify-center items-center">
        <div class="flex flex-col items-center space-y-4">
          <UIcon name="i-lucide-loader" class="animate-spin size-10 text-primary" />
          <span class="text-gray-500 animate-pulse">Đang tải lịch giảng dạy...</span>
        </div>
      </div>

      <div v-else-if="teacherSchedule" class="space-y-5">
        <BaseSelectMenu
          v-model="filters"
          :items="FILTERS"
          value-key="value"
          label-key="label"
          placeholder="Lọc"
          class="w-1/6 max-lg:w-1/4 max-sm:w-full"
          @change="getSchedule(teacherSchedule.teacher.teacherId, filters)"
        />
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
            <UiTeacherScheduleTable
              :rows="teacherSchedule.schedule.today"
              :status-config="statusConfig"
              :format-date="formatDate"
            />
          </template>
          <template #upcoming>
            <UiTeacherScheduleTable
              :rows="teacherSchedule.schedule.upcoming"
              :status-config="statusConfig"
              :format-date="formatDate"
            />
          </template>
          <template #completed>
            <UiTeacherScheduleTable
              :rows="teacherSchedule.schedule.completed"
              :status-config="statusConfig"
              :format-date="formatDate"
            />
          </template>

          <template #trailing="{ item }">
            <div class="flex items-center gap-3">
              <UBadge :label="String(item.badge)" variant="outline" size="sm" :color="item.badge > 0 ? 'primary' : 'neutral'" />
            </div>
          </template>
        </UTabs>
      </div>
    </template>
  </UModal>
</template>

<style scoped></style>
