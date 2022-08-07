<template>
  <div>
    <tree-map/>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

import TreeMap from '../../echart-template/tree-map.vue';

export default defineComponent({
  name: 'DashBoard',
  components: {
    TreeMap
  },
  setup() {
    console.log('log error')
    return {
    }
  }
})
</script>
