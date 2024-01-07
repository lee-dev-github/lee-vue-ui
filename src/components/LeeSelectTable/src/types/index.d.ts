import type { LeeTableProps } from "@/components/LeeTable/src/LeeTable.vue"

export interface LeeSelectTableProps extends LeeTableProps {
  fetchSelectedApi: (value: any[]) => Promise<Record<string, any>[]>
  modelValue?: string | number | string[] | number[]
  multiple?: boolean,
  labelKey?: string
  valueKey?: string
  disabled?: boolean
  placeholder?: string
}

export interface LeeSelectTableState {
  inputWidth: number
  inputHovering: boolean
  dropVisible: boolean
  valueLabelMap: Record<string, string>
}

export interface LeeSelectTableContentProps extends LeeTableProps {
  multiple?: boolean
}
