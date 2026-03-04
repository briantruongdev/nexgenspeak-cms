<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const {
  isLoading,
  currentMonth,
  summary,
  availableByDate,
  upcomingByDate,
  completedByDate,
  prevMonth,
  nextMonth,
  fetchSchedule,
  formatDateLabel
} = useMySchedule()

const tabs = computed(() => [
  { label: 'Lịch trống', icon: 'i-lucide-calendar-check', slot: 'available' as const },
  { label: 'Sắp tới', icon: 'i-lucide-clock', slot: 'upcoming' as const },
  { label: 'Đã hoàn thành', icon: 'i-lucide-circle-check-big', slot: 'completed' as const }
])

const summaryCards = computed(() => [
  {
    label: 'Lịch trống',
    value: summary.value?.totalAvailableSlots ?? 0,
    icon: 'i-lucide-calendar-check',
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    label: 'Sắp tới',
    value: summary.value?.totalUpcomingSlots ?? 0,
    hours: summary.value?.totalUpcomingHours ?? 0,
    icon: 'i-lucide-clock',
    color: 'text-amber-600',
    bg: 'bg-amber-50'
  },
  {
    label: 'Đã hoàn thành',
    value: summary.value?.totalCompletedSlots ?? 0,
    hours: summary.value?.totalCompletedHours ?? 0,
    icon: 'i-lucide-circle-check-big',
    color: 'text-green-600',
    bg: 'bg-green-50'
  }
])

const statusBadge: Record<string, { label: string; color: 'primary' | 'warning' | 'success' }> = {
  available: { label: 'Trống', color: 'primary' },
  upcoming: { label: 'Sắp tới', color: 'warning' },
  completed: { label: 'Hoàn thành', color: 'success' }
}

onMounted(() => fetchSchedule())
</script>

<template>
  <div class="card-box flex-1 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold">Lịch giảng dạy của tôi</h1>
      <div class="flex items-center gap-2">
        <UButton icon="i-lucide-chevron-left" color="neutral" variant="ghost" size="sm" @click="prevMonth" />
        <span class="text-sm font-semibold min-w-40 text-center capitalize">{{ currentMonth }}</span>
        <UButton icon="i-lucide-chevron-right" color="neutral" variant="ghost" size="sm" @click="nextMonth" />
      </div>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="h-64 flex justify-center items-center">
      <div class="flex flex-col items-center space-y-4">
        <UIcon name="i-lucide-loader" class="animate-spin size-10 text-primary" />
        <span class="text-gray-500 animate-pulse">Đang tải lịch giảng dạy...</span>
      </div>
    </div>

    <template v-else>
      <!-- Summary cards -->
      <div class="grid grid-cols-3 gap-4">
        <div
          v-for="card in summaryCards"
          :key="card.label"
          class="rounded-xl p-5 flex items-center gap-4 transition-shadow hover:shadow-md"
          :class="card.bg"
        >
          <div class="p-3 rounded-xl bg-white/80 shadow-sm">
            <UIcon :name="card.icon" class="size-6" :class="card.color" />
          </div>
          <div>
            <p class="text-xs text-gray-500 uppercase tracking-wide">{{ card.label }}</p>
            <p class="text-2xl font-bold" :class="card.color">{{ card.value }}</p>
            <p v-if="card.hours !== undefined" class="text-xs text-gray-400">{{ card.hours }} giờ</p>
            <p v-else class="text-xs text-gray-400">slot</p>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <UTabs :items="tabs" variant="link">
        <!-- Available -->
        <template #available>
          <div v-if="!availableByDate.length" class="py-16 flex flex-col items-center gap-3 text-gray-400">
            <UIcon name="i-lucide-calendar-x" class="size-10" />
            <span class="text-sm">Không có lịch trống trong tháng này</span>
          </div>
          <div v-else class="space-y-4 mt-4">
            <div v-for="[date, slots] in availableByDate" :key="date">
              <div class="flex items-center gap-2 mb-2">
                <UIcon name="i-lucide-calendar-days" class="size-4 text-blue-500" />
                <h3 class="text-sm font-semibold text-gray-700 capitalize">{{ formatDateLabel(date) }}</h3>
                <UBadge :label="`${slots.length} slot`" color="primary" variant="subtle" size="xs" />
              </div>
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="slot in slots"
                  :key="slot.slotId"
                  class="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
                >
                  <UIcon name="i-lucide-clock" class="size-3.5" />
                  {{ slot.startTime }} – {{ slot.endTime }}
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Upcoming -->
        <template #upcoming>
          <div v-if="!upcomingByDate.length" class="py-16 flex flex-col items-center gap-3 text-gray-400">
            <UIcon name="i-lucide-calendar-x" class="size-10" />
            <span class="text-sm">Không có lịch sắp tới</span>
          </div>
          <div v-else class="space-y-4 mt-4">
            <div v-for="[date, slots] in upcomingByDate" :key="date">
              <div class="flex items-center gap-2 mb-2">
                <UIcon name="i-lucide-clock" class="size-4 text-amber-500" />
                <h3 class="text-sm font-semibold text-gray-700 capitalize">{{ formatDateLabel(date) }}</h3>
                <UBadge :label="`${slots.length} slot`" color="warning" variant="subtle" size="xs" />
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead>
                    <tr class="text-left text-xs text-gray-400 uppercase border-b">
                      <th class="py-2 pr-4">Giờ học</th>
                      <th class="py-2 pr-4">Học viên</th>
                      <th class="py-2">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="slot in slots" :key="slot.slotId" class="border-b last:border-b-0 hover:bg-gray-50">
                      <td class="py-2.5 pr-4 font-medium">{{ slot.startTime }} – {{ slot.endTime }}</td>
                      <td class="py-2.5 pr-4">
                        <span v-if="slot.studentEmail">{{ slot.studentEmail }}</span>
                        <span v-else class="text-gray-400">—</span>
                      </td>
                      <td class="py-2.5">
                        <UBadge
                          :label="statusBadge[slot.status]?.label ?? slot.status"
                          :color="statusBadge[slot.status]?.color ?? 'neutral'"
                          variant="subtle"
                          size="sm"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </template>

        <!-- Completed -->
        <template #completed>
          <div v-if="!completedByDate.length" class="py-16 flex flex-col items-center gap-3 text-gray-400">
            <UIcon name="i-lucide-calendar-x" class="size-10" />
            <span class="text-sm">Chưa có buổi học hoàn thành</span>
          </div>
          <div v-else class="space-y-4 mt-4">
            <div v-for="[date, slots] in completedByDate" :key="date">
              <div class="flex items-center gap-2 mb-2">
                <UIcon name="i-lucide-circle-check-big" class="size-4 text-green-500" />
                <h3 class="text-sm font-semibold text-gray-700 capitalize">{{ formatDateLabel(date) }}</h3>
                <UBadge :label="`${slots.length} slot`" color="success" variant="subtle" size="xs" />
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead>
                    <tr class="text-left text-xs text-gray-400 uppercase border-b">
                      <th class="py-2 pr-4">Giờ học</th>
                      <th class="py-2 pr-4">Học viên</th>
                      <th class="py-2">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="slot in slots" :key="slot.slotId" class="border-b last:border-b-0 hover:bg-gray-50">
                      <td class="py-2.5 pr-4 font-medium">{{ slot.startTime }} – {{ slot.endTime }}</td>
                      <td class="py-2.5 pr-4">
                        <span v-if="slot.studentEmail">{{ slot.studentEmail }}</span>
                        <span v-else class="text-gray-400">—</span>
                      </td>
                      <td class="py-2.5">
                        <UBadge label="Hoàn thành" color="success" variant="subtle" size="sm" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </template>

        <template #trailing="{ item }">
          <UBadge
            v-if="item.slot === 'available'"
            :label="String(summary?.totalAvailableSlots ?? 0)"
            variant="outline"
            size="sm"
            :color="(summary?.totalAvailableSlots ?? 0) > 0 ? 'primary' : 'neutral'"
          />
          <UBadge
            v-else-if="item.slot === 'upcoming'"
            :label="String(summary?.totalUpcomingSlots ?? 0)"
            variant="outline"
            size="sm"
            :color="(summary?.totalUpcomingSlots ?? 0) > 0 ? 'primary' : 'neutral'"
          />
          <UBadge
            v-else-if="item.slot === 'completed'"
            :label="String(summary?.totalCompletedSlots ?? 0)"
            variant="outline"
            size="sm"
            :color="(summary?.totalCompletedSlots ?? 0) > 0 ? 'primary' : 'neutral'"
          />
        </template>
      </UTabs>
    </template>
  </div>
</template>

<style scoped></style>
