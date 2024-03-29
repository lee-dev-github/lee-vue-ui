<script setup lang="ts">
import LeeSelectPageCore from "@/components/LeeSelectPage/src/LeeSelectPageCore.vue"

const fetchData = async (searchText: string) => {
  console.log(searchText)

  const res: Record<string, any> = []
  for (let i = 0; i < 100; i++) {
    res.push(String(i))
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(res)
    }, 1200)
  })
}

</script>

<template>
  <div>
    <LeeSelectPageCore :fetch-data="fetchData"></LeeSelectPageCore>
  </div>
</template>

<style scoped lang="scss"></style>
