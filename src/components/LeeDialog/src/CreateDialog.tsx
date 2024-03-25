import type { MaybeRef, VNode } from "vue"
import type { LeeDialogProps2 } from "@/components/LeeDialog/src/types"
import { computed, h, isVNode, reactive, ref, render } from "vue"
import { ElButton, ElDialog } from "element-plus"
import { isFunction } from "@/utils/is"

type Comp = {
  content: VNode | (() => VNode)
  header?: VNode | (() => VNode)
  footer?: VNode | (() => VNode)
}

export const useDialogOld = (comp: Comp, opts: MaybeRef<LeeDialogProps2>) => {
  const options = ref(opts)

  const defaultState: LeeDialogProps2 = {
    appendToBody: true,
    destroyOnClose: true,
    cancelText: "取消",
    confirmText: "确定"
  }
  const dialogState = reactive<LeeDialogProps2>(
    Object.assign({}, defaultState, options.value, {
      modelValue: false
    })
  )

  const DefaultFooter = () => {
    return (
      <div>
        <ElButton onClick={() => cancel()}>{dialogState.cancelText}</ElButton>
        <ElButton type="primary" onClick={() => confirm()}>
          {dialogState.confirmText}
        </ElButton>
      </div>
    )
  }

  const renderComp = (item?: VNode | (() => VNode)) => {
    if (isFunction(item)) {
      return item
    } else if (isVNode(item)) {
      return () => item
    } else {
      return null
    }
  }

  const DialogComp = () => {
    return (
      <ElDialog {...dialogState} v-model={dialogState.modelValue} beforeClose={() => cancel()}>
        {{
          default: renderComp(comp.content),
          header: () => renderComp(comp.header),
          footer: () => renderComp(comp.footer) ?? DefaultFooter()
        }}
      </ElDialog>
    )
  }

  const container = document.createElement("div")

  let vNode: VNode | null = null

  const close = () => {
    dialogState.modelValue = false
    render(null, container)
    container.parentElement?.removeChild(container)
  }

  const open = () => {
    render(vNode, container)
    document.body.appendChild(container)
    dialogState.modelValue = true
  }

  const cancel = async () => {
    const result = await (options.value?.onCancelClick?.() ?? true)
    if (result) {
      close()
    }
  }

  const confirm = async () => {
    const result = await (options.value?.onConfirmClick?.() ?? true)
    if (result) {
      close()
    }
  }

  const updateOptions = () => {
    vNode = h(DialogComp, options.value)
  }

  updateOptions()

  return {
    open,
    close,
    isOpen: computed(() => dialogState.modelValue ?? false)
  }
}
