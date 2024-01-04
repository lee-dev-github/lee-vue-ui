import type { Component } from "vue"
import type { PageDataReq, PageDataResp } from "@/hooks/types/table"
import type { EnumProps } from "@/components/LeeTable"

export interface SelectPageProps {
  requestKey?: string
  initRequestParam?: Record<string, any>
  requestApi: (param: PageDataReq) => Promise<PageDataResp>
  fetchSelectedApi: (value: any[]) => Promise<EnumProps[]>
  modelValue?: string | number | boolean | Record<string, any> | unknown[]
  multiple?: boolean
  disabled?: boolean
  valueKey?: string
  size?: "" | "large" | "default" | "small"
  clearable?: boolean
  collapseTags?: boolean
  collapseTagsTooltip?: boolean
  multipleLimit?: number
  name?: string
  effect?: "dark" | "light" | string
  autocomplete?: string
  placeholder?: string
  loadingText?: string
  noMatchText?: string
  noDataText?: string
  popperClass?: string
  teleported?: boolean
  persistent?: boolean
  automaticDropdown?: boolean
  clearIcon?: string | Component
  fitInputWidth?: boolean
  suffixIcon?: string | Component
  tagType?: "" | "success" | "info" | "warning" | "danger"
  validateEvent?: boolean
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end"
  maxCollapseTags?: number
  popperOptions?: any
  ariaLabel?: string
}
