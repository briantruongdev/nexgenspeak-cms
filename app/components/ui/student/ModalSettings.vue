<script setup lang="ts">
import type { IStudent } from '~/types/student.type'

const { isSettingsModalVisible } = useStudent()

const prop = withDefaults(
  defineProps<{
    loading?: boolean
    student?: IStudent
  }>(),
  {
    loading: false
  }
)
const form = ref({
  maxSlotsPerDay: '',
  expirationDate: ''
})
const expirationDateRef = ref<{ $el?: HTMLElement } | null>(null)

const handleExpirationDateClick = () => {
  focusDateInput(expirationDateRef)
}
const emit = defineEmits<{
  save: [{ maxSlotsPerDay: string; expirationDate: string }]
}>()
const handleSave = () => {
  emit('save', form.value)
}
const resetForm = () => {
  form.value = {
    maxSlotsPerDay: '',
    expirationDate: ''
  }
}

watch(
  () => isSettingsModalVisible.value,
  () => {
    form.value.maxSlotsPerDay = prop.student?.slotAvailablePerDay ?? ''
    form.value.expirationDate = prop.student?.expirationDate ?? ''
  }
)
defineExpose({
  resetForm
})
</script>

<template>
  <UModal
    v-model:open="isSettingsModalVisible"
    title="Cài đặt tài khoản"
    class="w-2/3"
    :ui="{ close: 'hover:cursor-pointer' }"
    @close:prevent="resetForm"
  >
    <template #body>
      <UForm ref="formRef" :state="form" class="space-y-6 max-sm:space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <UFormField name="maxSlotsPerDay" label="Số slot tối đa mỗi ngày">
            <UInput v-model="form.maxSlotsPerDay" label="Số slot tối đa mỗi ngày" class="w-full" size="xl" />
          </UFormField>
          <UFormField name="expirationDate" label="Ngày hết hạn (nếu có)">
            <UInput
              ref="expirationDateRef"
              v-model="form.expirationDate"
              label="Ngày hết hạn (nếu có)"
              type="date"
              :ui="{ base: 'h-10 w-full' }"
              class="w-full"
              @click="handleExpirationDateClick"
            />
          </UFormField>
        </div>
        <BaseButton text="Lưu cài đặt" class="w-full" :loading="prop.loading" @click="handleSave" />
      </UForm>
    </template>
  </UModal>
</template>

<style scoped></style>
