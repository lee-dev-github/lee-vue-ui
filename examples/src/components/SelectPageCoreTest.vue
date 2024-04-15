<script setup lang="ts">
import LeeSelectPageCore from "@/components/LeeSelectPage/src/LeeSelectPageCore.vue"
import type { PageReq, PageResp } from "@/components/LeeSelectPage"

const fetchData = async (req: PageReq) => {
  console.log(req)

  const res: Record<string, any>[] = []
  for (let i = 1; i <= 1002; i++) {
    res.push({
      id: i,
      name: String(i) + "-name"
    })
  }

  const totalList = res.filter((item) => item.name.includes(req.param?.searchText ?? ''))
  const list = totalList.filter((item, index) => index >= (req.pageNum - 1) * req.pageSize && index < req.pageNum * req.pageSize)

  return new Promise<PageResp>((resolve) => {
    setTimeout(() => {
      resolve({
        list: list,
        total: totalList.length,
        pageNum: req.pageNum,
        pageSize: req.pageSize
      })
    }, 600)
  })
}
</script>

<template>
  <div>
    <LeeSelectPageCore :fetch-data="fetchData"></LeeSelectPageCore>
  </div>
</template>

<style scoped lang="scss"></style>
