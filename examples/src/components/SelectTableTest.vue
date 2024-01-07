<script setup lang="ts">
import LeeSelectTable from "@/components/LeeSelectTable/src/LeeSelectTable.vue"
import { ref } from "vue"
import type { ColumnProps, EnumProps } from "@/components/LeeTable"
import type { PageDataReq } from "@/hooks/types/table"
const value = ref("16")

const columns = ref<ColumnProps[]>([
  {
    prop: "name",
    label: "姓名",
    search: {
      el: "input"
    }
  },
  {
    prop: "age",
    label: "年龄",
    search: {
      el: "input"
    }
  }
])

interface DataType {
  list: any[]
  pageNum: number
  pageSize: number
  total: number
}
const getTableData = async (param: PageDataReq) => {
  console.log(param)

  const pageNum = param.pageNum!
  const pageSize = param.pageSize!

  const list = []
  for (let i = (pageNum - 1) * pageSize; i < pageNum * pageSize; i++) {
    list.push({
      id: String(i),
      name: "张三" + i,
      age: 18 + i,
      address: "北京市",
      date: "2021-01-01",
      dict1: "1",
      dict2: "1",
      tag: "1"
    })
  }

  const result: DataType = { list: [], pageNum, pageSize, total: 100 }
  result.list = list
  return result
}

const fetchSelected = async (data: any[]) => {
  console.log("调用fetchSelectedApi: ", data)
  const list = []
  for (let i = 0; i < 100; i++) {
    list.push({
      id: String(i),
      name: "张三" + i,
      age: 18 + i,
      address: "北京市",
      date: "2021-01-01",
      dict1: "1",
      dict2: "1",
      tag: "1"
    })
  }

  return list.filter((item) => data.some((query) => item.name.includes(query)))
}


const value2 = ref<string[]>(["17", "56", "10", "11", "12", "13", "14", "15", "16", "17"])

const activeName = ref("1")
</script>

<template>
  <div>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="单选" name="1">
        <div>123</div>
<!--        <LeeSelectTable-->
<!--          v-model="value"-->
<!--          row-key="id"-->
<!--          :columns="columns"-->
<!--          :request-api="getTableData"-->
<!--          :fetch-selected-api="fetchSelected"-->
<!--        ></LeeSelectTable>-->
<!--        <div>{{ value }}</div>-->
      </el-tab-pane>
      <el-tab-pane label="多选" name="2">
        <LeeSelectTable
          multiple
          v-model="value2"
          row-key="id"
          :columns="columns"
          :request-api="getTableData"
          :fetch-selected-api="fetchSelected"
        ></LeeSelectTable>
        <div>{{ value2 }}</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss"></style>
