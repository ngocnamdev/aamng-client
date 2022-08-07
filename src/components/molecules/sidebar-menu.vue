<template>
  <q-list>
    <template v-for="(item, index) in items" :key="index">
      <q-expansion-item
        v-if="item.children"
        :label="item.label"
        class="rounded-borders"
      >
        <template #header>
          <q-item-section avatar>
            <q-icon
              size="sm"
              :name="item.icon"
              :color="item.to.name === activeMenu ? 'primary' : 'accent'"
            />
          </q-item-section>
          <q-item-section> {{ item.label }} </q-item-section>
        </template>
        <sidebar-menu :items="item.children"> </sidebar-menu>
      </q-expansion-item>
      <q-item
        v-else
        v-ripple
        clickable
        :active="item.to.name === activeMenu"
        :to="item.to"
        class="rounded-borders"
        active-class="bg-blue-1"
      >
        <q-item-section avatar>
          <q-icon
            size="sm"
            :name="item.icon"
            :color="item.to.name === activeMenu ? 'primary' : 'accent'"
          />
        </q-item-section>
        <q-item-section> {{ item.label }} </q-item-section>
      </q-item>
    </template>
  </q-list>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { useRoute } from 'vue-router'
import { Menu } from '../../types/menu'

export default defineComponent({
  name: 'SidebarMenu',
  props: {
    items: {
      type: Object as PropType<Menu[]>,
      default() {
        return [] as Menu[]
      },
    },
  },
  setup() {
    const route = useRoute()

    const activeMenu = computed(() => {
      return route.name
    })

    return { activeMenu }
  },
})
</script>
