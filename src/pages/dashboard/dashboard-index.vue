<template>
  <q-page class="q-pa-sm">
    <dashboard/>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Dashboard from '../../../src/components/pages/dashboard/dashboard.vue'

export default defineComponent({
  components: { Dashboard },
  setup() {
    console.log('')
  },
})
</script>

