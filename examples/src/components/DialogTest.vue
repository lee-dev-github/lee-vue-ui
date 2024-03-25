<script setup lang="tsx">
import { useDialog, useDialogOld } from "@/components/LeeDialog"
import { ElInput } from "element-plus"
import { reactive, watch } from "vue"

const formModel = reactive({
  username: "33"
})

watch(
  () => formModel.username,
  (value) => {
    console.log("watch: ", value)
  }
)

// const { open, close } = useDialogOld(
//   {
//     content: () => <ElInput v-model={formModel.username}></ElInput>
//   },
//   {
//     title: "title3"
//   }
// )

const dialog = useDialog()

const onOpenClick = () => {
  // open()
  dialog.create({
    title: "",
    content: "123",
    closeOnClickModal: false
  })
}

const onCloseClick = () => {
  close()
}
</script>

<template>
  <div>
    <el-button @click="onOpenClick">打开</el-button>
    <el-button @click="onCloseClick">关闭</el-button>
  </div>
</template>

<style scoped lang="scss"></style>
