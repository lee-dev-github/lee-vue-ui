<script setup lang="ts">
import { ref } from "vue"
import LeeTable from "@/components/LeeTable/src/LeeTable.vue"
import type { ColumnProps } from "@/components/LeeTable"

const columns = ref<ColumnProps[]>([
  {
    type: "sort",
    label: "Sort"
  },
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
  },
  {
    prop: "address",
    label: "地址",
    search: {
      el: "input"
    }
  },
  {
    prop: "date",
    label: "日期",
    search: {
      el: "input"
    }
  },
  {
    prop: "dict1",
    label: "字典1",
    enumList: [
      {
        label: "一",
        value: "1",
      },
      {
        label: "二",
        value: "2"
      }
    ],
    search: {
      el: "select"
    }
  },
  {
    prop: "dict2",
    label: "字典2",
    enumList: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: [
              {
                label: "一",
                value: "1",
              },
              {
                label: "二",
                value: "2"
              }
            ]
          })
        }, 5000)
      })
    },
    search: {
      el: "select"
    }
  },
  {
    prop: "tag",
    label: "TAG",
    tag: true,
    enumList: [
      {
        label: "一",
        value: "1",
        tagType: "danger"
      },
      {
        label: "二",
        value: "2"
      }
    ],
    search: {
      el: "select"
    }
  }
])

interface DataType {
  list: any[]
  pageNum: number
  pageSize: number
  total: number
}
const getTableData = async () => {
  const result: DataType = { list: [], pageNum: 1, pageSize: 10, total: 2 }
  result.list = [
    {
      name: "张三",
      age: 18,
      address: "北京市",
      date: "2021-01-01",
      dict1: "1",
      dict2: "1",
      tag: "1"
    },
    {
      name: "李四",
      age: 18,
      address: "北京市",
      date: "2021-01-01",
      dict1: "2",
      dict2: "2",
      tag: "2"
    }
  ]
  return result
}
</script>

<template>
  <LeeTable :columns="columns" :request-api="getTableData"></LeeTable>
</template>

<style scoped lang="scss">

</style>