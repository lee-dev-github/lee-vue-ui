<script setup lang="ts">
import type { PageDataReq } from "@/hooks/types/table"
import LeeSelectPage from "@/components/LeeSelectPage/src/LeeSelectPage.vue"
import { ref } from "vue"
import type { EnumProps } from "@/components/LeeTable"

interface DataType {
  list: any[]
  pageNum: number
  pageSize: number
  total: number
}
const getTableData = async (param: PageDataReq): Promise<DataType> => {

  const pageNum = param.pageNum!
  const pageSize = param.pageSize!
  const query = param.param?.query ?? ""

  let list = []
  for (let i = 1; i <= 100; i++) {
    list.push({
      label: "张三" + i,
      value: String(i)
    })
  }

  const totalList = list.filter((item) => item.label.includes(query))

  list = totalList.slice((pageNum - 1) * pageSize, pageNum * pageSize)

  const result: DataType = { list: [], pageNum, pageSize, total: totalList.length }
  result.list = list
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result)
    }, 500)
  })
}

const fetchSelectedApi = async (value: any) => {
  console.log("调用fetchSelectedApi: ", value)
  const list: EnumProps[] = []
  for (const item of Array.isArray(value) ? value : [value]) {
    const res = await getTableData({
      pageNum: 1,
      pageSize: 5,
      param: {
        query: item
      }
    })
    res.list.forEach((target) => {
      if (!list.find((exist) => exist.value === target)) {
        list.push(target)
      }
    })
  }
  console.log("fetch: ", list)
  return list
}

const value = ref(["54"])

setTimeout(() => {
  value.value.push(...["78", "23", "34", "56"])
}, 5000)
</script>

<template>
  <LeeSelectPage
    v-model="value"
    multiple
    :request-api="getTableData"
    :fetch-selected-api="fetchSelectedApi"
  ></LeeSelectPage>
</template>

<style scoped lang="scss"></style>
