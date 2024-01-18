<script setup lang="ts">
import type { LeeFormProps } from "@/components/LeeForm/src/types"
import { useLeeForm } from "@/components/LeeForm/src/hooks/useLeeForm"
import LeeFormItem from "@/components/LeeForm/src/components/LeeFormItem.vue"

const props = withDefaults(defineProps<LeeFormProps>(), {
  enumMap: () => ({})
})

const formModel = defineModel<Recordable>({ required: true })

const { formProps, isUseCollapse, activeCollapseNames, defaultLayout, formRef } = useLeeForm(
  props,
  formModel
)

defineExpose({
  formRef: formRef.value
})
</script>

<template>
  <el-form ref="formRef" v-bind="formProps" class="overflow-x-hidden">
    <template v-if="isUseCollapse">
      <el-collapse v-model="activeCollapseNames">
        <el-collapse-item
          v-for="collapse in schemas"
          :key="collapse.prop"
          :title="collapse.label"
          :name="collapse.prop"
        >
        </el-collapse-item>
      </el-collapse>
    </template>
    <template v-else>
      <el-row :gutter="20">
        <el-col v-for="item in schemas" :key="item.prop" v-bind="item.layout ?? defaultLayout">
          <LeeFormItem v-bind="item" v-model="formModel"></LeeFormItem>
        </el-col>
      </el-row>
    </template>
  </el-form>
</template>

<style scoped lang="scss"></style>
