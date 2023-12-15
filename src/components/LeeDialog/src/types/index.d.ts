import type { DialogProps } from "element-plus"
import type { Writable } from "element-plus/es/utils"

export interface LeeDialogProps extends Writable<Partial<DialogProps>> {
  cancelText?: string
  confirmText?: string,
  onCancelClick?: () => boolean | Promise<boolean | void> | void
  onConfirmClick?: () => boolean | Promise<boolean | void> | void
}