import type { Component } from "vue"

export interface SelectProps {
  modelValue?: string | number | boolean | Record<string, any> | unknown[] | null
  options?: SelectOption[]
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
  filterable?: boolean
  allowCreate?: boolean
  filterMethod?: (value: string) => void
  remote?: boolean
  remoteMethod?: (value: string) => void
  remoteShowSuffix?: boolean
  loading?: boolean
  loadingText?: string
  noMatchText?: string
  noDataText?: string
  popperClass?: string
  reserveKeyword?: boolean
  defaultFirstOption?: boolean
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

export interface SelectOption {
  label?: string // 选项框显示的文字
  value: string | number | boolean | Record<string, any> // 选项框值
  disabled?: boolean // 是否禁用此选项
  children?: EnumProps[] // 为树形选择时，可以通过 children 属性指定子选项
  [key: string]: any
}
