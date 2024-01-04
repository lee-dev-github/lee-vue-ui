<template>
  <!-- 分页组件 -->
  <el-pagination
    :background="true"
    :current-page="pageable.pageNum"
    :page-size="pageable.pageSize"
    :page-sizes="pageSizes"
    :total="pageable.total"
    :layout="layout"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  ></el-pagination>
</template>

<script setup lang="ts">
interface Pageable {
  pageNum: number
  pageSize: number
  total: number
}

interface PaginationProps {
  pageable: Pageable
  pageSizes?: number[]
  layout?: string
  handleSizeChange: (size: number) => void
  handleCurrentChange: (currentPage: number) => void
}

withDefaults(defineProps<PaginationProps>(), {
  pageSizes: () => [10, 25, 50, 100],
  layout: "total, sizes, prev, pager, next, jumper"
})
</script>
