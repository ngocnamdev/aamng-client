<template>
  <q-scroll-area
    class="fit the-sidebar"
    :thumb-style="thumbStyle"
    :bar-style="barStyle"
  >
    <sidebar-menu :items="menuList"> </sidebar-menu>
  </q-scroll-area>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import SidebarMenu from 'src/components/molecules/sidebar-menu.vue'
import { Menu } from 'src/types/menu'
const menuList: Menu[] = [
  {
    icon: 'dashboard',
    label: 'Dashboard',
    separator: true,
    to: { name: 'dashboard-index', path: '/dashboard' },
  },
  {
    icon: 'task',
    label: 'Member User',
    separator: true,
    to: { name: 'member-index' },
    children: [
      {
        label: 'Member Settings',
        separator: false,
        to: { name: 'member-settings' },
      },
      {
        label: 'Member Files',
        separator: false,
        to: { name: 'member-files' },
      },
    ],
  },
  {
    icon: 'add_task',
    label: 'Team',
    separator: false,
    to: { name: 'team', path: '/team' },
    children: [
      {
        label: 'Team Settings',
        separator: false,
        to: { name: 'team-settings' },
      },
      {
        label: 'Team Files',
        separator: false,
        to: { name: 'team-files' },
      },
    ],
  },
  {
    icon: 'apps',
    label: 'Cloud App',
    separator: false,
    to: { name: 'cloud-app', path: '/cloud-app' },
  },
  {
    icon: 'settings_suggest',
    label: 'Account Settings',
    separator: false,
    to: { name: 'account-setting', path: '/account/setting' },
  },
]

export default defineComponent({
  components: { SidebarMenu },
  setup() {
    return {
      thumbStyle: {
        borderRadius: '100px',
        background: 'linear-gradient(90deg, #ff7351, #e71c1c)',
        width: '0.5em',
        opacity: 1,
      } as Partial<unknown>,
      barStyle: {
        boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
        width: '0.5em',
        opacity: 0.2,
      } as Partial<unknown>,
      menuList,
    }
  },
})
</script>
<style>
.the-sidebar {
  max-height: calc(100vh - 200px);
}
</style>
