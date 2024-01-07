<script setup lang="tsx">
import { useNamespace } from "@/hooks/useNamespace"
import {
  type ComponentPublicInstance,
  computed,
  nextTick,
  onMounted,
  reactive,
  ref,
  unref
} from "vue"
import type { LeeSelectTableProps, LeeSelectTableState } from "@/components/LeeSelectTable"
import vClickOutside from "@/directives/click-outside"
import { ElTooltip } from "element-plus"
import SelectTableContent from "@/components/LeeSelectTable/src/components/SelectTableContent.vue"
import { isNilOrEmpty, isNullOrUnDef } from "@/utils/is"
import type { ColumnProps } from "@/components/LeeTable"
import { ElRadio, ElCheckbox, ElCheckboxGroup } from "element-plus"
import { useResizeObserver, watchDebounced } from "@vueuse/core"
import { CircleClose, ArrowDown } from "@element-plus/icons-vue"

const props = withDefaults(defineProps<LeeSelectTableProps>(), {
  labelKey: "name",
  valueKey: "id",
  pagination: true,
  requestAuto: true,
  searchCol: 2,
  pageConfig: () => {
    return {
      layout: "total, prev, next, jumper",
      pageSizes: [5],
      pageSize: 5
    }
  },
  disabled: false,
  placeholder: "请选择"
})

const ns = useNamespace("select-table")

const state = reactive<LeeSelectTableState>({
  inputWidth: 0,
  inputHovering: false,
  dropVisible: false,
  valueLabelMap: {}
})

const model = defineModel<string | number | string[] | number[]>()

const inputPlaceHolder = computed(() => {
  if (!isNilOrEmpty(model.value) || props.disabled) {
    return undefined
  }
  return props.placeholder
})

const fetchSelectedData = async (values: any[]) => {
  try {
    const res = await props.fetchSelectedApi(values)
    res.forEach((item) => {
      state.valueLabelMap[String(item[props.valueKey])] = item[props.labelKey] ?? ""
    })
  } catch (e) {
    console.log(e)
  }
}
watchDebounced(
  () => props.modelValue,
  async (value) => {
    const valueList = Array.isArray(value) ? value : [value]
    const needSearchList = valueList.filter((item) =>
      isNullOrUnDef(state.valueLabelMap[String(item)])
    )
    if (needSearchList.length) {
      await fetchSelectedData(needSearchList)
    }
    if (props.multiple) {
      await resetInputHeight()
    }
  },
  {
    debounce: 300,
    deep: true,
    immediate: true
  }
)

const selectTableContentRef = ref<InstanceType<typeof SelectTableContent> | null>(null)
const selectWrapper = ref<HTMLElement | null>(null)
const tooltipRef = ref<InstanceType<typeof ElTooltip> | null>(null)
const popperPaneRef = computed(() => {
  return tooltipRef.value?.popperRef?.contentRef
})

const inputLabelText = computed(() => {
  if (props.multiple || isNilOrEmpty(model.value)) {
    return ""
  }
  return state.valueLabelMap[String(model.value)] ?? model.value
})

const contentStyle = computed(() => {
  return {
    width: "600px",
    height: "400px"
  }
})

const currentTableData = computed(() => selectTableContentRef.value?.leeTableRef?.tableData ?? [])

const currentAllIdList = computed(
  () => currentTableData.value?.map((item) => item[props.valueKey]) ?? []
)
const currentSelectedCount = computed(
  () => currentAllIdList.value.filter((item) => (model.value as any[]).includes(item)).length
)
const isCurrentAllSelected = computed(
  () =>
    currentAllIdList.value.length > 0 &&
    currentSelectedCount.value === currentAllIdList.value.length
)
const onAllSelected = () => {
  if (isCurrentAllSelected.value) {
    model.value = (model.value as any[]).filter((item) => !currentAllIdList.value.includes(item))
  } else {
    currentTableData.value.forEach((item) => {
      state.valueLabelMap[String(item[props.valueKey])] = item[props.labelKey] ?? ""
    })
    ;(model.value as any[]).push(...currentAllIdList.value)
  }
}

const tableColumns = computed(() => {
  let selectColumn: ColumnProps
  if (!props.multiple) {
    selectColumn = {
      prop: "__radio",
      width: 80,
      render: ({ row }) => {
        return (
          <ElRadio
            v-model={model.value}
            label={row[props.valueKey]}
            onChange={(value) => onRadioChange(value, row)}
          >
            <i></i>
          </ElRadio>
        )
      }
    }
  } else {
    selectColumn = {
      prop: "__selection",
      width: 80,
      render: ({ row }) => {
        return (
          <ElCheckboxGroup v-model={model.value}>
            <ElCheckbox label={row[props.valueKey]} onChange={() => onSelectionChange(row)}>
              <i></i>
            </ElCheckbox>
          </ElCheckboxGroup>
        )
      },
      headerRender: () => {
        return (
          <ElCheckbox
            modelValue={isCurrentAllSelected.value}
            indeterminate={
              currentSelectedCount.value > 0 &&
              currentSelectedCount.value < currentAllIdList.value.length
            }
            onChange={onAllSelected}
          >
            <i></i>
          </ElCheckbox>
        )
      }
    }
  }
  return [selectColumn, ...props.columns]
})

const tags = ref<HTMLElement | null>(null)
const reference = ref<ComponentPublicInstance<{
  focus: () => void
  blur: () => void
  input: HTMLInputElement
}> | null>(null)
const resetInputHeight = async () => {
  await nextTick()
  if (!reference.value) {
    return
  }
  const input = reference.value.$el.querySelector("input") as HTMLInputElement

  const isElHidden = input.offsetParent === null

  const selectedCount = (model.value as any[])?.length ?? 0

  const inputHeight =
    (selectedCount === 0
      ? 32
      : Math.max(
          tags.value ? tags.value.clientHeight + (tags.value.clientHeight > 32 ? 6 : 0) : 0,
          32
        )) - 2

  if (!isElHidden) {
    input.style.height = `${inputHeight}px`
  }
}

const handleResize = () => {
  resetInputWidth()
  props.multiple && resetInputHeight()
}

const resetInputWidth = () => {
  state.inputWidth = reference.value?.$el.offsetWidth
}

onMounted(async () => {
  // 元素从不可见变为可见时，触发resize
  useResizeObserver(selectWrapper, handleResize)

  await nextTick()
  state.inputWidth = reference.value?.$el?.getBoundingClientRect()?.width ?? 0
})

const onInputClick = () => {
  state.dropVisible = true
}
const onClickOutSide = () => {
  state.dropVisible = false
}

const onRadioChange = (value: string | number | boolean, item: Record<any, any>) => {
  state.valueLabelMap[String(value)] = item[props.labelKey] ?? ""
  state.dropVisible = false
}

const onSelectionChange = (item: Record<string, string>) => {
  state.valueLabelMap[String(item[props.valueKey])] = item[props.labelKey] ?? ""
}

const onRemoveTag = (value: unknown) => {
  model.value = (model.value as any[]).filter((item) => item !== value)
}

const showClose = computed(() => {
  return !isNilOrEmpty(model.value) && state.inputHovering && !props.disabled
})
const iconReverse = computed(() => ns.is("reverse", state.dropVisible))
const onClearClick = (e: Event) => {
  e.stopPropagation()
  model.value = props.multiple ? [] : ""
}

const selectTagsStyle = computed(() => ({
  maxWidth: `${unref(state.inputWidth) - 32 - 11}px`,
  width: "100%"
}))
</script>

<template>
  <div
    ref="selectWrapper"
    :class="ns.b('container')"
    v-click-outside:[popperPaneRef]="onClickOutSide"
  >
    <el-tooltip ref="tooltipRef" :visible="state.dropVisible" effect="light">
      <template #content>
        <SelectTableContent
          ref="selectTableContentRef"
          :style="contentStyle"
          v-bind="props"
          :row-key="valueKey"
          :columns="tableColumns"
        ></SelectTableContent>
      </template>
      <div
        :class="ns.b('input')"
        @click="onInputClick"
        @mouseenter="state.inputHovering = true"
        @mouseleave="state.inputHovering = false"
      >
        <div v-if="multiple" :style="selectTagsStyle" ref="tags" :class="ns.be('input', 'tags')">
          <el-tag
            v-for="tag in model"
            :key="tag"
            type="info"
            closable
            @close="() => onRemoveTag(tag)"
            >{{ state.valueLabelMap[String(tag)] ?? tag }}</el-tag
          >
        </div>
        <el-input
          ref="reference"
          readonly
          :model-value="inputLabelText"
          :placeholder="inputPlaceHolder"
        >
          <template #suffix>
            <el-icon v-if="!showClose" :class="[ns.be('input', 'icon'), iconReverse]">
              <ArrowDown></ArrowDown>
            </el-icon>
            <el-icon v-else :class="ns.be('input', 'icon')" @click="onClearClick">
              <CircleClose></CircleClose>
            </el-icon>
          </template>
        </el-input>
      </div>
    </el-tooltip>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/mixins/mixins";

@include b("select-table-input") {
  position: relative;
  @include e("tags") {
    position: absolute;
    line-height: normal;
    top: 50%;
    transform: translateY(-50%);
    white-space: normal;
    z-index: var(--el-index-normal);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    cursor: pointer;
    margin-left: 11px;

    .el-tag {
      box-sizing: border-box;
      border-color: transparent;
      margin: 2px 6px 2px 0;
    }
  }

  @include e("icon") {
    color: var(--el-select-input-color);
    font-size: var(--el-select-input-font-size);
    transition: transform var(--el-transition-duration);
    cursor: pointer;

    position: relative;
    height: inherit;
    z-index: 2;
  }
}
</style>
