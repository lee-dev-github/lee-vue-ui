<script setup lang="tsx">
import type { VNode } from "vue"
import { ref } from "vue"
import { useNamespace } from "@/hooks/useNamespace"
import { ElIcon } from "element-plus"
import {
  Search as SearchIcon,
  Loading as LoadingIcon,
  ArrowRight,
  ArrowLeft,
  DArrowRight,
  DArrowLeft
} from "@element-plus/icons-vue"
import { useDebounceFn } from "@vueuse/core"
import type { SelectPageCoreProps } from "@/components/LeeSelectPage"

const props = withDefaults(defineProps<SelectPageCoreProps>(), {
  prop: "id",
  label: "name"
})

const model = defineModel()

const ns = useNamespace("sp")

const searchText = ref("")
const pageState = ref({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

const RenderContainer = (children: VNode[]) => {
  return <div class={ns.b("container")}>{children.map((item) => item)}</div>
}

const isLoading = ref(false)
const tableData = ref<Record<string, any>[]>([])

const RenderList = () => {
  return (
    <div class={ns.b("list")}>
      {isLoading.value ? (
        <div class={ns.be("list", "empty")}>加载中...</div>
      ) : tableData.value.length ? (
        tableData.value.map((item) => <div class={ns.be("list", "item")}>{item[props.label]}</div>)
      ) : (
        <div class={ns.be("list", "empty")}>暂无数据</div>
      )}
    </div>
  )
}

const fetchDataList = async () => {
  console.log("search change: ", searchText.value)
  try {
    isLoading.value = true
    const res = await props.fetchData?.({
      pageNum: pageState.value.pageNum,
      pageSize: pageState.value.pageSize,
      param: {
        searchText: searchText.value
      }
    })

    tableData.value = res?.list ?? []
    pageState.value.total = res?.total ?? 0
  } catch (e) {
    console.error(e)
    tableData.value = []
  } finally {
    isLoading.value = false
  }
}
const fetchDataListDebounce = useDebounceFn(fetchDataList, 500)

const RenderSearch = () => {
  return (
    <div class={ns.b("search")}>
      {isLoading.value ? (
        <ElIcon class={[ns.b("search-left"), ns.is("loading")]}>
          <LoadingIcon class={ns.be("search-left", "icon")} />
        </ElIcon>
      ) : (
        <ElIcon class={ns.b("search-left")}>
          <SearchIcon class={ns.be("search-left", "icon")} />
        </ElIcon>
      )}
      <input
        class={ns.be("search", "input")}
        placeholder="搜索..."
        onInput={(e) => {
          pageState.value.pageNum = 1
          searchText.value = (e.target as HTMLInputElement).value
          fetchDataListDebounce()
        }}
      ></input>
    </div>
  )
}

const onNextPageClick = async () => {
  pageState.value.pageNum += 1
  await fetchDataListDebounce()
}

const onPrePageClick = async () => {
  pageState.value.pageNum -= 1
  await fetchDataListDebounce()
}

const onFirstPageClick = async () => {
  pageState.value.pageNum = 1
  await fetchDataListDebounce()
}

const onLastPageClick = async () => {
  pageState.value.pageNum = Math.ceil(pageState.value.total / pageState.value.pageSize)
  await fetchDataListDebounce()
}

const RenderPage = () => {
  return (
    <div class={ns.b("page")}>
      <div>
        <span>第{pageState.value.pageNum}页 / 共{Math.ceil(pageState.value.total / pageState.value.pageSize)}页</span>
      </div>
      <div class={ns.b("page-right")}>
        <div onClick={onFirstPageClick}>
          <ElIcon>
            <DArrowLeft />
          </ElIcon>
        </div>
        <div onClick={onPrePageClick}>
          <ElIcon>
            <ArrowLeft />
          </ElIcon>
        </div>
        <div onClick={onNextPageClick}>
          <ElIcon>
            <ArrowRight />
          </ElIcon>
        </div>
        <div onClick={onLastPageClick}>
          <ElIcon>
            <DArrowRight />
          </ElIcon>
        </div>
      </div>
    </div>
  )
}

const Render = () => RenderContainer([RenderSearch(), RenderList(), RenderPage()])

const init = async () => {
  await fetchDataList()
}
init()
</script>

<template>
  <component :is="Render()"></component>
</template>

<style scoped lang="scss">
@import "@/styles/mixins/mixins";

@include b("sp-container") {
  border-radius: 8px;
  border: 1px solid #dee2e6;
  max-width: 300px;

  @include b("sp-search") {
    padding: 0.5rem;
    display: flex;
    align-items: center;

    @include e("input") {
      width: 100%;
      padding: 4px 8px;
      border: 0;
      border-radius: 50rem;
      background-color: transparent;
      margin-left: 5px;
      font-size: 14px;
      line-height: 1.43;
      box-sizing: border-box;
      outline: none !important;
      color: #333;
      font-weight: 600;
      flex-grow: 1;
      transition: all 0.3s ease;

      &::placeholder {
        color: #aaa;
      }
    }

    @include b("sp-search-left") {
      @include e("icon") {
        color: #aaa;
      }
    }
  }

  @include b("sp-list") {
    height: 300px;
    max-width: 300px;
    overflow-y: auto;

    @include e("item") {
      padding: 4px 8px;
      color: #666;
      transition: all 0.3s ease;
      &:hover {
        cursor: pointer;
        background-color: #f6f8fa;
        color: #000;
        border-radius: 0.4rem;
      }
    }

    @include e("empty") {
      padding: 4px 8px;
      color: #666;
      transition: all 0.3s ease;
      cursor: default;
      user-select: none;
      height: 300px;
    }
  }

  @include b("sp-page") {
    display: flex;
    justify-content: space-between;
    padding: 4px 8px;

    @include b("sp-page-right") {
      display: flex;

      .el-icon {
        cursor: pointer;
      }

      .el-icon + .el-icon {
        margin-left: 4px;
        margin-right: 4px;
      }
    }
  }
}
</style>
