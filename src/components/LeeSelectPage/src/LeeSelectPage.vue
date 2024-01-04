<script setup lang="ts">
import type { SelectPageProps } from "@/components/LeeSelectPage/src/types"
import { nextTick, reactive } from "vue"
import type { Pageable, PageDataReq } from "@/hooks/types/table"
import type { EnumProps } from "@/components/LeeTable"
import {
  ArrowRight,
  ArrowLeft,
  Search,
  Loading,
  DArrowLeft,
  DArrowRight
} from "@element-plus/icons-vue"
import { watchDebounced } from "@vueuse/core"
import { useNamespace } from "@/hooks/useNamespace"
import { isNullOrUnDef } from "@/utils/is"

const ns = useNamespace("select-page")

const props = withDefaults(defineProps<SelectPageProps>(), {
  requestKey: "query",
  initRequestParam: () => ({}),
  // boolean透传时，没传的值会置为false，可能和预期不一致
  // https://blog.rxliuli.com/p/f3564b039a28421188146aa89b52a3c0
  multiple: undefined,
  disabled: undefined,
  clearable: undefined,
  collapseTags: undefined,
  collapseTagsTooltip: undefined,
  teleported: undefined,
  persistent: undefined,
  automaticDropdown: undefined,
  fitInputWidth: undefined,
  validateEvent: undefined
})

const model = defineModel<string | number | boolean | Record<string, any> | unknown[]>()

type State = Pageable & {
  lastPageNum: number
  hasFetchedInitData: boolean
  loading: boolean
  query: string
  options: EnumProps[]
  valueLabelMap: Record<string, string>
}
const state = reactive<State>({
  hasFetchedInitData: false,
  loading: false,
  pageNum: 1,
  pageSize: 5,
  total: 0,
  lastPageNum: 1,
  query: "",
  options: [],
  valueLabelMap: {}
})

const fetchSelectedData = async (values: any[]) => {
  try {
    const currOptions = state.options
    const res = await props.fetchSelectedApi(values)
    res.forEach((item) => {
      state.valueLabelMap[String(item.value)] = item.label ?? ""
    })
    state.options = res
    await nextTick()
    state.options = currOptions
  } catch (e) {
    console.log(e)
  }
}

const handleSearch = async () => {
  try {
    state.loading = true
    const param: PageDataReq = {
      pageNum: state.pageNum,
      pageSize: state.pageSize,
      param: {
        ...props.initRequestParam,
        [props.requestKey]: state.query
      }
    }
    const res = await props.requestApi(param)

    console.log("res: ", res)

    const { pageNum, pageSize, total, list } = res

    state.pageNum = pageNum
    state.pageSize = pageSize
    state.lastPageNum = Math.ceil(total / pageSize)
    state.total = total
    state.options = list ?? []
    list.forEach((item) => {
      state.valueLabelMap[String(item.value)] = item.label ?? ""
    })
  } catch (e) {
    console.log(e)
  } finally {
    state.loading = false
  }
}

const handleCurrentChange = (currentPage: number) => {
  if (state.loading || currentPage === 0 || currentPage > state.lastPageNum) {
    return
  }
  state.pageNum = currentPage
  handleSearch()
}

const onFirstPageClick = () => {
  if (state.pageNum === 1) {
    return
  }
  handleCurrentChange(1)
}

const onLastPageClick = () => {
  if (state.pageNum === state.lastPageNum) {
    return
  }
  handleCurrentChange(state.lastPageNum)
}

watchDebounced(
  () => props.modelValue,
  async (value) => {
    const valueList = Array.isArray(value) ? value : [value]
    const needSearchList = valueList.filter((item) =>
      isNullOrUnDef(state.valueLabelMap[String(item)])
    )
    await fetchSelectedData(needSearchList)
  },
  {
    debounce: 300,
    deep: true
  }
)

watchDebounced(
  () => state.query,
  async () => {
    if (!state.hasFetchedInitData) {
      await fetchSelectedData(
        Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue]
      )
      state.hasFetchedInitData = true
      await nextTick()
    }
    await handleSearch()
  },
  {
    immediate: true,
    debounce: 300
  }
)
</script>

<template>
  <el-select v-bind="props" v-model="model" :multiple="multiple" :placeholder="placeholder">
    <template #header>
      <el-input v-model="state.query" size="small" clearable>
        <template #prefix>
          <el-icon>
            <Loading v-if="state.loading" class="is-loading" />
            <Search v-else />
          </el-icon>
        </template>
      </el-input>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <div class="user-select-none">第{{ state.pageNum }} / {{ state.lastPageNum }}页</div>
        <div class="flex justify-items-center items-center">
          <el-icon
            class="p-1"
            :class="[
              ns.be('action', 'icon'),
              state.pageNum === 1 ? ns.bem('action', 'icon', 'disabled') : ''
            ]"
            :size="16"
            :color="state.loading ? 'var(--el-color-info-light-3)' : ''"
            @click="() => onFirstPageClick()"
          >
            <Loading v-if="state.loading" class="is-loading" />
            <DArrowLeft v-else />
          </el-icon>
          <el-icon
            class="p-1"
            :class="[
              ns.be('action', 'icon'),
              state.pageNum === 1 ? ns.bem('action', 'icon', 'disabled') : ''
            ]"
            :size="16"
            :color="state.loading ? 'var(--el-color-info-light-3)' : ''"
            @click="() => handleCurrentChange(state.pageNum - 1)"
          >
            <Loading v-if="state.loading" class="is-loading" />
            <ArrowLeft v-else />
          </el-icon>
          <el-icon
            class="p-1"
            :class="[
              ns.be('action', 'icon'),
              state.pageNum === state.lastPageNum ? ns.bem('action', 'icon', 'disabled') : ''
            ]"
            :size="16"
            :color="state.loading ? 'var(--el-color-info-light-3)' : ''"
            @click="() => handleCurrentChange(state.pageNum + 1)"
          >
            <Loading v-if="state.loading" class="is-loading" />
            <ArrowRight v-else />
          </el-icon>
          <el-icon
            class="p-1"
            :class="[
              ns.be('action', 'icon'),
              state.pageNum === state.lastPageNum ? ns.bem('action', 'icon', 'disabled') : ''
            ]"
            :size="16"
            :color="state.loading ? 'var(--el-color-info-light-3)' : ''"
            @click="() => onLastPageClick()"
          >
            <Loading v-if="state.loading" class="is-loading" />
            <DArrowRight v-else />
          </el-icon>
        </div>
      </div>
    </template>
    <el-option
      v-for="item in state.options"
      :key="String(item.value)"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<style scoped lang="scss">
@import "@/styles/mixins/mixins";

@include b("select-page-action") {
  @include e("icon") {
    &:hover {
      cursor: pointer;
      background-color: var(--el-fill-color-light);
    }

    @include m("disabled") {
      color: var(--el-text-color-disabled);
      &:hover {
        cursor: default;
        background-color: unset;
      }
    }
  }
}

.el-icon + .el-icon {
  margin-left: 2px;
}
</style>
