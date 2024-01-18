<script setup lang="tsx">
import type { LeeFormSchema } from "@/components/LeeForm/src/types"
import { computed, h, resolveComponent } from "vue"
import type { VNode } from "vue"
import type { FormItemProps } from "element-plus"
import { ElFormItem } from "element-plus"
interface LeeFormItemProps extends LeeFormSchema {}

const props = defineProps<LeeFormItemProps>()

const formModel = defineModel<Recordable>({ required: true })

const formItemProps = computed(() => {
  const target = {
    ...props,
    type: undefined,
    labelTip: undefined,
    visible: undefined,
    disabled: undefined,
    layout: undefined,
    component: undefined,
    compRender: undefined,
    labelRender: undefined,
    allRender: undefined,
    bindProps: undefined
  }
  Reflect.deleteProperty(target, "children")
  return target as FormItemProps
})

const CustomComp = () => {
  if (props.compRender) {
    return props.compRender({ formModel: formModel.value }) as VNode
  }
  return h(resolveComponent(props.comp!), {
    ...props.bindProps,
    style: {
      width: "100%"
    },
    modelValue: formModel.value[props.prop],
    "onUpdate:modelValue": (value: unknown) => {
      formModel.value[props.prop] = value
    }
  })
}

const ItemRender = () => {
  if (props.allRender) {
    return props.allRender({ formModel: formModel.value })
  }

  return (
    <ElFormItem {...formItemProps.value}>
      {{
        default: () => CustomComp(),
        label: () => props.labelRender?.({ formModel: formModel.value })
      }}
    </ElFormItem>
  )
}
</script>

<template>
  <ItemRender></ItemRender>
</template>

<style scoped lang="scss"></style>
