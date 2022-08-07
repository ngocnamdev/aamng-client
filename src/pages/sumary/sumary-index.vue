<template>
  <div>
    <p>SUMARY</p>
    <button @click="onClick">click</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getEmployeeById } from 'src/utils/employeeApi'

export default defineComponent({
  setup() {
    const onClick = async () => {
      const result = await getEmployeeById('21480913')
      console.log(result)
    }

    return {
      onClick,
    }
  },
})
</script>

