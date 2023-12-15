<script setup lang="ts">
import type { SelectProps } from "@/components/LeeSelect/src/types"
import {
  BLUR_EVENT,
  CHANGE_EVENT,
  CLEAR_EVENT,
  FOCUS_EVENT,
  UPDATE_MODEL_EVENT
} from "@/constans/events"
import { computed, ref, type WritableComputedRef } from "vue"
import { ElSelect } from "element-plus"
import { isNilOrEmpty } from "@/utils/is"

const props = defineProps<SelectProps>()

const emit = defineEmits<{
  "update:modelValue": [value: string | number | boolean | Record<string, any> | unknown[] | null]
  change: [value: string | number | boolean | null]
  "visible-change": [visible: boolean]
  "remove-tag": [tagValue: any]
  clear: []
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const selectModel = computed({
  get() {
    if (props.modelValue === null) {
      return ""
    }
    return props.modelValue
  },
  set(value) {
    emit(
      UPDATE_MODEL_EVENT,
      isNilOrEmpty(value)
        ? null
        : (value as string | number | boolean | Record<string, any> | unknown[])
    )
  }
})

const selectRef = ref<InstanceType<typeof ElSelect> | null>(null)

defineExpose({
  focus: () => selectRef.value?.focus(),
  blur: () => selectRef.value?.blur()
})
</script>

<template>
  <el-select
    ref="selectRef"
    v-bind="props"
    v-model="selectModel"
    @change="(value) => emit(CHANGE_EVENT, value)"
    @visible-change="(visible) => emit('visible-change', visible)"
    @remove-tag="(tagValue) => emit('remove-tag', tagValue)"
    @clear="() => emit(CLEAR_EVENT)"
    @blur="(e) => emit(BLUR_EVENT, e)"
    @focus="(e) => emit(FOCUS_EVENT, e)"
  >
    <template v-if="$slots.empty" #empty>
      <slot name="empty"></slot>
    </template>
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix"></slot>
    </template>
    <template v-if="$slots.header" #header>
      <slot name="header"></slot>
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer"></slot>
    </template>
    <el-option
      v-for="item in options"
      :key="String(item.value)"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    ></el-option>
  </el-select>
</template>

<style scoped lang="scss"></style>
