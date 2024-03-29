<script setup lang="tsx">
import type { VNode } from "vue"
import { ref } from "vue"
import { useNamespace } from "@/hooks/useNamespace"
import { ElIcon } from "element-plus"
import { Search as SearchIcon, Loading as LoadingIcon } from "@element-plus/icons-vue"
import { useDebounceFn } from "@vueuse/core"

interface SelectPageCoreProps {
  fetchData?: (searchText: string) => Promise<Record<string, any>[]>
  fetchSelectedData?: () => Promise<any>
}

const props = defineProps<SelectPageCoreProps>()

const model = defineModel()

const ns = useNamespace("sp")

const searchText = ref("")

const RenderContainer = (children: VNode[]) => {
  return <div class={ns.b("container")}>{children.map((item) => item)}</div>
}

const isLoading = ref(false)
const tableData = ref<Record<string, any>[]>([])

const RenderList = () => {
  return (
    <div class={ns.b("list")}>
      {tableData.value.length ? (
        tableData.value.map((item) => <div class={ns.be("list", "item")}>{item}</div>)
      ) : (
        <div class={ns.be("list", "empty")}>暂无数据</div>
      )}
    </div>
  )
}

const handleSearchChange = useDebounceFn(async (e: Event) => {
  searchText.value = (e.target as HTMLInputElement).value
  console.log("search change: ", searchText.value)
  try {
    isLoading.value = true
    tableData.value = (await props.fetchData?.(searchText.value)) ?? []
  } catch (e) {
    console.error(e)
    tableData.value = []
  } finally {
    isLoading.value = false
  }
}, 500)

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
        onInput={handleSearchChange}
      ></input>
    </div>
  )
}

const RenderPage = () => {
  return <div>page</div>
}

const Render = () => RenderContainer([RenderSearch(), RenderList(), RenderPage()])
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
    max-height: 320px;
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
    }
  }
}
</style>
