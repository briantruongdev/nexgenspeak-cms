<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { ScheduleSlot } from '~/types/teacher.type'

const props = defineProps<{
  rows: ScheduleSlot[]
  statusConfig: Record<ScheduleSlot['status'], { label: string; color: 'success' | 'warning' | 'primary' }>
  formatDate: (d: string) => string
}>()

const UBadge = resolveComponent('UBadge')

const columns: ColumnDef<ScheduleSlot>[] = [
  {
    accessorKey: 'date',
    header: 'Ngày',
    cell: ({ row }) => h('span', { class: 'text-sm' }, props.formatDate(row.original.date))
  },
  {
    accessorKey: 'startTime',
    header: 'Giờ học',
    cell: ({ row }) => h('span', { class: 'text-sm font-medium' }, `${row.original.startTime} – ${row.original.endTime}`)
  },
  {
    accessorKey: 'studentEmail',
    header: 'Học viên',
    cell: ({ row }) =>
      h('div', [
        h('p', { class: 'text-sm font-medium' }, row.original.studentEmail),
        h('p', { class: 'text-xs text-gray-400' }, row.original.studentPhone ?? '—')
      ])
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => {
      const cfg = props.statusConfig[row.original.status]
      return h(UBadge, { color: cfg.color, variant: 'subtle', size: 'sm' }, () => cfg.label)
    }
  }
]
</script>

<template>
  <div class="mt-3">
    <div v-if="!rows.length" class="py-12 flex flex-col items-center gap-2 text-gray-400">
      <UIcon name="i-lucide-calendar-x" class="size-8" />
      <span class="text-sm">Không có lịch</span>
    </div>
    <UTable v-else :data="rows" :columns="columns" :ui="{ tr: 'hover:bg-gray-50 dark:hover:bg-gray-800/50' }" />
  </div>
</template>
