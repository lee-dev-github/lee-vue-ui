<script setup lang="ts">
import LeeForm from "@/components/LeeForm/src/LeeForm.vue"
import { ref } from "vue"
import type { LeeFormSchema } from "@/components/LeeForm/src/types"

const formModel = ref({
  name: "",
  age: null,
  type: ""
})
const schemas = ref<LeeFormSchema[]>([
  {
    label: "姓名",
    prop: "name",
    comp: "el-input"
  },
  {
    label: "姓名2",
    prop: "name2",
    comp: "el-input"
  },
  {
    label: "年龄",
    prop: "age",
    comp: "el-input-number"
  },
  {
    label: "年龄2",
    prop: "age2",
    comp: "el-select"
  }
])
</script>

<template>
  <LeeForm :schemas="schemas" :label-width="120" v-model="formModel"></LeeForm>
</template>

<style scoped lang="scss"></style>
