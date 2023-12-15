<script setup lang="ts">
import LeeSelect from "@/components/LeeSelect/src/LeeSelect.vue"
import { ref } from "vue"
import type { SelectOption } from "@/components/LeeSelect"

const value = ref("")

const options = ref<SelectOption[]>([
  {
    label: "一",
    value: "1"
  },
  {
    label: "二",
    value: "2"
  },
  {
    label: "三",
    value: "3"
  }
])


</script>

<template>
  <LeeSelect v-model="value" :options="options" clearable></LeeSelect>
</template>

<style scoped lang="scss">

</style>