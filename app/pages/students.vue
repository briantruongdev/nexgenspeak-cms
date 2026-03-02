<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { IStudent } from '~/types/student.type'
import { apiStudent } from '~/services'

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const { showError, showSuccess } = useNotification()
definePageMeta({ middleware: 'auth' })

const { listStudents, pending, getSchedule, isScheduleModalVisible, isSettingsModalVisible, refresh } = useStudent()
const student = ref<IStudent>({} as IStudent)

const modalSettingsRef = ref()
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
  },
  // {
  //   accessorKey: 'actions',
  //   header: 'Xem lịch học',
  //   cell: () => ''
  // },
  {
    id: 'actions',
    meta: {
      class: {
        td: 'text-right'
      }
    },
    cell: ({ row }) => {
      return h(
        UDropdownMenu,
        {
          content: {
            align: 'end'
          },
          items: getRowItems(row),
          'aria-label': 'Actions dropdown'
        },
        () =>
          h(UButton, {
            icon: 'i-lucide-ellipsis-vertical',
            color: 'neutral',
            variant: 'ghost',
            'aria-label': 'Actions dropdown'
          })
      )
    }
  }
]
function getRowItems(row: any) {
  return [
    {
      label: 'Xem lịch học',
      icon: 'i-lucide-eye',
      onSelect() {
        handleViewSchedule(row.original.userId)
      }
    },
    {
      label: 'Cài đặt',
      icon: 'i-lucide-settings',
      onSelect() {
        student.value = row.original
        isSettingsModalVisible.value = true
      }
    }
  ]
}

const handleViewSchedule = (userId: string) => {
  getSchedule(userId)
  isScheduleModalVisible.value = true
}

const isLoading = ref(false)
const handleSettings = async (form: Record<string, any>) => {
  isLoading.value = true
  try {
    await apiStudent.settings(student.value.userId, { ...form, maxSlotsPerDay: +form.maxSlotsPerDay })
    refresh()
    isSettingsModalVisible.value = false
    modalSettingsRef.value?.resetForm()
    showSuccess('Cập nhật cài đặt thành công')
  } catch (error) {
    console.log(error)
    showError('Cập nhật cài đặt thất bại')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="card-box flex-1 space-y-6">
    <UTable
      :data="listStudents ?? []"
      :loading="pending || isLoading"
      loading-color="primary"
      loading-animation="carousel"
      :columns="columns"
      :ui="{ tr: 'hover:bg-gray-50 dark:hover:bg-gray-800/50' }"
    />
    <UiStudentModalSchedule />
    <UiStudentModalSettings ref="modalSettingsRef" :student="student" :loading="isLoading" @save="handleSettings" />
  </div>
</template>

<style scoped></style>
