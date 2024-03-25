import type { VNode } from "vue"
import { h, ref, render } from "vue"
import { type DialogProps, ElDialog } from "element-plus"
import { isFunction } from "@/utils/is"
import type { Writable } from "element-plus/es/utils"

export interface LeeDialogOptions extends Writable<Partial<DialogProps>> {
  content?: string | VNode | (() => VNode)

  positiveText?: string
  onPositiveClick?: (e?: MouseEvent) => MaybePromise<boolean> | void

  negativeText?: string
  onNegativeClick?: (e?: MouseEvent) => MaybePromise<boolean> | void

  onCloseClick?: (e?: MouseEvent) => MaybePromise<boolean> | void
}

export const useDialog = () => {
  const defaultOptions: LeeDialogOptions = {
    title: "",
    content: "",
    positiveText: "确定",
    negativeText: "关闭",
    closeOnClickModal: false
  }

  const state = ref<LeeDialogOptions>(defaultOptions)
  const dialogVisible = ref(false)


  const cancel = async () => {
    const result = await (state.value?.onNegativeClick?.() ?? true)
    if (result) {
      close()
    }
  }

  const confirm = async () => {
    const result = await (state.value?.onPositiveClick?.() ?? true)
    if (result) {
      close()
    }
  }

  const renderComp = (item?: string | VNode | (() => VNode)) => {
    if (isFunction(item)) {
      return item
    } else {
      return () => item
    }
  }

  const DialogComp = () => {
    return (
      <ElDialog {...state.value} v-model={dialogVisible.value} beforeClose={() => cancel()}>
        {{
          default: renderComp()
        }}
      </ElDialog>
    )
  }

  const container = document.createElement("div")

  let vNode: VNode | null = null

  const close = () => {
    dialogVisible.value = false
    vNode = null
    render(null, container)
    container.parentElement?.removeChild(container)
  }

  const open = () => {
    vNode = h(DialogComp)
    render(vNode, container)
    document.body.appendChild(container)
    dialogVisible.value = true
  }

  const create = (options: LeeDialogOptions) => {
    state.value = { ...state.value, ...options }
    open()
  }

  return {
    create
  }
}
