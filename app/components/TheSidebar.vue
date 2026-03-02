<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const router = useRouter()

const items: NavigationMenuItem[][] = [
  [
    {
      label: 'Giáo viên',
      icon: 'i-lucide-users-round',
      to: '/'
    },
    {
      label: 'Học sinh',
      icon: 'i-lucide-users-round',
      to: '/students'
    }
  ],
  [
    {
      label: 'Feedback',
      icon: 'i-lucide-message-circle',
      to: 'https://github.com/canhnd1109',
      target: '_blank'
    },
    {
      label: 'Help & Support',
      icon: 'i-lucide-info',
      to: 'https://github.com/canhnd1109',
      target: '_blank'
    }
  ]
]
</script>

<template>
  <UDashboardSidebar
    collapsible
    resizable
    :ui="{ footer: 'border-t border-default', header: 'mt-4 mb-2' }"
    class="dark:bg-bg-seconary-dark rounded-lg bg-white border-none"
  >
    <template #header>
      <img src="/images/logo.png" alt="Logo" class="cursor-pointer h-20" @click="router.push('/')" />
    </template>

    <template #default="{ collapsed }">
      <UButton
        :label="collapsed ? undefined : 'Search...'"
        icon="i-lucide-search"
        color="neutral"
        variant="outline"
        class="py-2.5 px-4"
        block
        :square="collapsed"
      >
        <template v-if="!collapsed" #trailing>
          <div class="flex items-center gap-0.5 ms-auto">
            <UKbd value="meta" variant="subtle" />
            <UKbd value="K" variant="subtle" />
          </div>
        </template>
      </UButton>

      <UNavigationMenu :collapsed="collapsed" :items="items[0]" orientation="vertical" :ui="{ link: 'cursor-pointer h-10' }" />

      <UNavigationMenu
        :collapsed="collapsed"
        :items="items[1]"
        orientation="vertical"
        class="mt-auto"
        :ui="{ link: 'cursor-pointer h-10' }"
      />
    </template>

    <template #footer="{ collapsed }">
      <UButton
        :avatar="{
          src: 'https://i.pravatar.cc/120?img=5',
          class: 'w-8 h-8'
        }"
        :label="collapsed ? undefined : 'Admin'"
        color="neutral"
        variant="ghost"
        class="w-full gap-2"
        :block="collapsed"
      />
    </template>
  </UDashboardSidebar>
</template>
