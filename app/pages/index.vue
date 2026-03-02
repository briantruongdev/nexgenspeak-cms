<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { ITeacher } from '~/types/teacher.type'

definePageMeta({ middleware: 'auth' })

const { listTeachers, pending } = useTeacher()

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
  }
]
</script>

<template>
  <div class="card-box flex-1 space-y-6">
    <ClientOnly>
      <UTable :data="listTeachers ?? []" :columns="columns" :ui="{ tr: 'hover:bg-gray-50 dark:hover:bg-gray-800/50' }" />
      <template #fallback>
        <div class="h-[40vh] flex justify-center items-center">
          <div class="flex flex-col items-center space-y-4">
            <UIcon name="i-lucide-loader" class="animate-spin size-10 text-primary" />
            <span class="text-gray-500 animate-pulse">Đang tải...</span>
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<style scoped></style>
