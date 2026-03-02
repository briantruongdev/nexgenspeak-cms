<script setup lang="ts">
import AuthLayout from '~/components/ui/AuthLayout.vue'
import { loginSchema } from '~/schemas/auth.schema'

definePageMeta({ middleware: 'guest' })

const { isProcessing, formLogin, canLogin, handleLogin } = useAuth()
const showPass = ref(false)
const formRef = ref()

const login = async () => {
  const isValid = await formRef.value?.validate()
  if (isValid && canLogin.value) {
    await handleLogin()
  }
}
</script>

<template>
  <AuthLayout sub-title="Đăng nhập vào NexGen Speak" height-img="h-screen">
    <UForm ref="formRef" :schema="loginSchema" :state="formLogin" class="space-y-6 max-sm:space-y-4">
      <UFormField name="email">
        <UInput v-model="formLogin.email" placeholder="Email" :ui="{ base: 'h-12 bg-transparent' }" class="w-full" />
      </UFormField>

      <div>
        <UFormField name="password" class="w-full">
          <UInput
            v-model="formLogin.password"
            placeholder="Mật khẩu"
            :type="showPass ? 'text' : 'password'"
            class="w-full"
            :ui="{ trailing: 'pe-1', base: 'h-12 bg-transparent' }"
            @keyup.enter="login"
          >
            <template #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="sm"
                :icon="showPass ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="showPass ? 'Hide password' : 'Show password'"
                :aria-pressed="showPass"
                aria-controls="password"
                @click="showPass = !showPass"
              />
            </template>
          </UInput>
        </UFormField>
      </div>
      <BaseButton
        text="Login"
        class="w-full"
        class-name="h-12"
        :loading="isProcessing"
        :disabled="isProcessing || !canLogin"
        class-text="text-lg"
        @click="login"
      />
    </UForm>
  </AuthLayout>
</template>
