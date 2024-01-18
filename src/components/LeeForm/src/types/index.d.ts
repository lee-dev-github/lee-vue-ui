import type { FormItemProps, FormItemRule, FormProps } from "element-plus"
import type { BreakPoint, Responsive } from "@/components/Grid/types"
import type { VNode } from "vue"
import type { EnumProps } from "@/components/LeeTable"

export interface LeeFormProps extends Partial<FormProps> {
  schemas: LeeFormSchema[]
  enumMap?: Recordable<EnumProps[]>
}

export interface LeeFormSchema extends Partial<FormItemProps> {
  type?: "normal" | "collapse",
  label: string
  labelTip?: string
  prop: string
  visible?: boolean
  required?: boolean
  disabled?: boolean
  rules?: Arrayable<FormItemRule>
  layout?: Partial<Record<BreakPoint, Responsive | number>> & Responsive
  comp?: string
  compRender?: (scope: RenderScope) => VNode | string
  labelRender?: (scope: RenderScope) => VNode | string
  allRender?: (scope: RenderScope) => VNode | string
  bindProps?: Record<string, any>
  children?: LeeFormSchema[]
}

export interface RenderScope {
  formModel: Recordable
}