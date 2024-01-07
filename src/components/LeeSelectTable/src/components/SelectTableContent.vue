<script setup lang="ts">
import LeeTable from "@/components/LeeTable/src/LeeTable.vue"
import type { LeeSelectTableContentProps } from "@/components/LeeSelectTable"
import { computed, ref } from "vue"
import type { ColumnProps, LeeTableInstance } from "@/components/LeeTable"

const props = withDefaults(defineProps<LeeSelectTableContentProps>(), {})

const leeTableRef = ref<LeeTableInstance | null>(null)

defineExpose({
  leeTableRef
})

</script>

<template>
  <div>
    <LeeTable ref="leeTableRef" v-bind="props"></LeeTable>
  </div>
</template>

<style scoped lang="scss"></style>
