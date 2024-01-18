import type { LeeFormProps } from "@/components/LeeForm/src/types"
import { computed, ref } from "vue"
import type { FormInstance, FormProps } from "element-plus"

export const useLeeForm = (props: LeeFormProps, formModel: any) => {
  const formProps = computed<FormProps>(() => {
    return {
      ...props,
      model: formModel.value,
      modelValue: undefined,
      schemas: undefined
    } as FormProps
  })

  const isUseCollapse = computed(() => props.schemas.every((item) => item.type === "collapse"))
  const activeCollapseNames = ref<string[]>([])

  const formRef = ref<FormInstance | null>(null)

  const validate = async () => {
    if (!formRef.value) {
      return
    }

    return formRef.value.validate().then(() => true).catch(() => false)
  }

  const defaultLayout = {
    span: 12,
    xl: 12,
    lg: 12,
    md: 12,
    sm: 24,
    xs: 24
  }

  return {
    formProps,
    isUseCollapse,
    activeCollapseNames,
    defaultLayout,
    formRef: formRef as any,
    validate
  }
}
