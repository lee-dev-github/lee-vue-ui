<script setup lang="ts">
import { ref } from "vue"
import TableTest from "./src/components/TableTest.vue"
import SelectTest from "./src/components/SelectTest.vue"
import DialogTest from "./src/components/DialogTest.vue"
import SelectTableTest from "./src/components/SelectTableTest.vue"
import SelectPageTest from "./src/components/SelectPageTest.vue"
import FormTest from "./src/components/FormTest.vue"
import SelectPageCoreTest from "./src/components/SelectPageCoreTest.vue"

const activeName = ref("SelectPageCoreTest")
</script>

<template>
  <div style="height: 100%; box-sizing: border-box; padding: 16px">
    <el-tabs v-model="activeName">
      <el-tab-pane label="LeeTable" name="TableTest">
        <TableTest></TableTest>
      </el-tab-pane>
      <el-tab-pane label="SelectPageCoreTest" name="SelectPageCoreTest">
        <SelectPageCoreTest></SelectPageCoreTest>
      </el-tab-pane>
      <el-tab-pane label="SelectPageTest" name="SelectPageTest">
        <SelectPageTest></SelectPageTest>
      </el-tab-pane>
      <el-tab-pane label="SelectTableTest" name="SelectTableTest">
        <SelectTableTest></SelectTableTest>
      </el-tab-pane>
      <el-tab-pane label="DialogTest" name="DialogTest">
        <DialogTest></DialogTest>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss"></style>
