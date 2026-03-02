<script setup lang="ts">
import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { IStudent } from '~/types/student.type'

definePageMeta({ middleware: 'auth' })

const { listStudents, pending } = useStudent()

const columns: ColumnDef<IStudent>[] = [
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => h('span', { class: 'text-sm font-medium' }, row.original.email)
  },
  // {
  //   accessorKey: 'fullName',
  //   header: 'Họ tên',
  //   cell: ({ row }) => h('span', { class: 'text-sm' }, row.original.fullName || '—')
  // },
  {
    accessorKey: 'phone',
    header: 'Số điện thoại',
    cell: ({ row }) => h('span', { class: 'text-sm' }, row.original.phone || '—')
  },
  {
    accessorKey: 'slotAvailablePerDay',
    header: 'Slot/ngày',
    cell: ({ row }) =>
      h('div', { class: 'flex justify-center' }, [
        h(resolveComponent('UBadge'), { color: 'primary', variant: 'subtle' }, () => row.original.slotAvailablePerDay)
      ])
  },
  {
    accessorKey: 'expirationDate',
    header: 'Ngày hết hạn',
    cell: ({ row }) =>
      h(
        'span',
        { class: 'text-sm' },
        row.original.expirationDate ? new Date(row.original.expirationDate).toLocaleDateString('vi-VN') : '—'
      )
  },
  {
    accessorKey: 'createdAt',
    header: 'Ngày tạo',
    cell: ({ row }) => h('span', { class: 'text-sm text-gray-500' }, new Date(row.original.createdAt).toLocaleDateString('vi-VN'))
  }
]
</script>

<template>
  <div class="card-box flex-1 space-y-6">
    <ClientOnly>
      <UTable :data="listStudents ?? []" :columns="columns" :ui="{ tr: 'hover:bg-gray-50 dark:hover:bg-gray-800/50' }" />
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
