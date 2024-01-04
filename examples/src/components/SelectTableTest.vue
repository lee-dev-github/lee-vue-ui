<script setup lang="ts">
import LeeSelectTable from "@/components/LeeSelectTable/src/LeeSelectTable.vue"
import { ref } from "vue"
import type { ColumnProps } from "@/components/LeeTable"
import type { PageDataReq } from "@/hooks/types/table"
const value = ref("")


const columns = ref<ColumnProps[]>([
  {
    type: "radio",
    prop: "radio"
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
      el: "select",
      props: {
        multiple: true
      }
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
const getTableData = async (param: PageDataReq) => {
  console.log(param)

  const pageNum = param.pageNum!
  const pageSize = param.pageSize!

  const list = []
  for (let i = pageNum * pageSize; i < (pageNum + 1) * pageSize; i++) {
    list.push(    {
      id: String(i),
      name: "张三" + i,
      age: 18 + i,
      address: "北京市",
      date: "2021-01-01",
      dict1: "1",
      dict2: "1",
      tag: "1"
    },)
  }

  const result: DataType = { list: [], pageNum, pageSize, total: 100 }
  result.list = list
  return result
}

</script>

<template>
  <LeeSelectTable v-model="value" row-key="id" :columns="columns" :request-api="getTableData"></LeeSelectTable>
</template>

<style scoped lang="scss">

</style>