<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { ITeacher } from '~/types/teacher.type'

definePageMeta({ middleware: 'auth' })

const { listTeachers, pending, isScheduleModalVisible, getSchedule } = useTeacher()

const UBadge = resolveComponent('UBadge')

const columns: ColumnDef<ITeacher>[] = [
  {
    accessorKey: 'avatar',
    header: 'Avatar',
    cell: ({ row }) =>
      h('img', {
        src: `/images/${row.original.avatar}`,
        alt: row.original.fullName,
        class: 'size-10 rounded-full object-cover'
      })
  },
  {
    accessorKey: 'fullName',
    header: 'Tên giáo viên',
    cell: ({ row }) =>
      h('div', [
        h('p', { class: 'font-semibold text-sm' }, row.original.fullName),
        h('p', { class: 'text-xs text-gray-500' }, row.original.position)
      ])
  },
  {
    accessorKey: 'rating',
    header: 'Đánh giá',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-1' }, [
        h(UBadge, { color: 'warning', variant: 'subtle' }, () => `⭐ ${row.original.rating}`),
        h('span', { class: 'text-xs text-gray-400' }, `(${row.original.totalReviews})`)
      ])
  },
  {
    accessorKey: 'students',
    header: 'Học viên',
    cell: ({ row }) => h('span', { class: 'text-sm' }, row.original.students.toLocaleString())
  },
  {
    accessorKey: 'lessons',
    header: 'Buổi học',
    cell: ({ row }) => h('span', { class: 'text-sm' }, row.original.lessons.toLocaleString())
  },
  {
    accessorKey: 'languages',
    header: 'Ngôn ngữ',
    cell: ({ row }) =>
      h(
        'div',
        { class: 'flex flex-wrap gap-1' },
        row.original.languages.map(lang => h(UBadge, { key: lang, color: 'primary', variant: 'outline', size: 'sm' }, () => lang))
      )
  },
  {
    accessorKey: 'pricePerHour',
    header: 'Giá/giờ',
    cell: ({ row }) => h('span', { class: 'font-semibold text-primary text-sm' }, `$${row.original.pricePerHour}`)
  },
  {
    accessorKey: 'actions',
    header: 'Xem lịch giảng dạy',
    cell: () => ''
  }
]

const handleViewSchedule = (teacherId: string) => {
  getSchedule(teacherId, '')
  isScheduleModalVisible.value = true
}
</script>

<template>
  <div class="card-box flex-1 space-y-6">
    <UTable
      :data="listTeachers ?? []"
      :loading="pending"
      loading-color="primary"
      loading-animation="carousel"
      :columns="columns"
      :ui="{ tr: 'hover:bg-gray-50 dark:hover:bg-gray-800/50' }"
    >
      <template #actions-cell="{ row }">
        <p class="flex justify-center" @click="handleViewSchedule(row.original.teacherId)">
          <UIcon
            name="i-lucide-eye"
            class="hover:cursor-pointer hover:text-primary transition-all duration-300 hover:scale-110 size-6"
          />
        </p> </template
    ></UTable>
    <UiTeacherModalSchedule />
  </div>
</template>

<style scoped></style>
