<template>
    <div>
        <table-action/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TableAction from '../../components/molecules/table-action.vue'


export default defineComponent({
    components: {
        TableAction
    },
    setup() {
        console.log('admin')
    },
})
</script>

