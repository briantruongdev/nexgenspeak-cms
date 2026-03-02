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
    <UTable
      :data="listStudents ?? []"
      :loading="pending"
      loading-color="primary"
      loading-animation="carousel"
      :columns="columns"
      :ui="{ tr: 'hover:bg-gray-50 dark:hover:bg-gray-800/50' }"
    />
  </div>
</template>

<style scoped></style>
