<!--<script setup lang="ts">-->
<!--import { useNamespace } from "@/hooks/useNamespace"-->
<!--import { ref } from "vue"-->
<!--import type { LeeSelectTableProps } from "@/components/LeeSelectTable"-->

<!--const props = withDefaults(defineProps<LeeSelectTableProps>(), {-->
<!--  teleported: true,-->
<!--  effect: "light",-->
<!--  persistent: false-->
<!--})-->

<!--const ns = useNamespace("select-table")-->

<!--const dropVisible = ref(false)-->
<!--const inputHovering = ref(false)-->

<!--const selectedLabel = ref("")-->

<!--const handleMenuEnter = () => {}-->

<!--const handleFocus = () => {}-->
<!--const handleBlur = () => {}-->
<!--const debouncedOnInputChange = () => {}-->
<!--const handleComposition = () => {}-->
<!--</script>-->

<!--<template>-->
<!--  <div :class="ns.b('container')">-->
<!--    <el-tooltip-->
<!--      ref="tooltipRef"-->
<!--      :visible="dropVisible"-->
<!--      :placement="placement"-->
<!--      :teleported="teleported"-->
<!--      :popper-options="popperOptions"-->
<!--      :fallback-placements="['bottom-start', 'top-start', 'right', 'left']"-->
<!--      :effect="effect"-->
<!--      pure-->
<!--      trigger="click"-->
<!--      :transition="`${ns.namespace.value}-zoom-in-top`"-->
<!--      :stop-popper-mouse-event="false"-->
<!--      :gpu-acceleration="false"-->
<!--      :persistent="persistent"-->
<!--      @show="handleMenuEnter"-->
<!--    >-->
<!--      <template #default>-->
<!--        <div-->
<!--          class="select-trigger"-->
<!--          @mouseenter="inputHovering = true"-->
<!--          @mouseleave="inputHovering = false"-->
<!--        >-->
<!--          <el-input-->
<!--            :id="id"-->
<!--            ref="reference"-->
<!--            v-model="selectedLabel"-->
<!--            type="text"-->
<!--            :placeholder="placeholder"-->
<!--            :name="name"-->
<!--            :autocomplete="autocomplete"-->
<!--            :size="'default'"-->
<!--            :disabled="disabled"-->
<!--            :readonly="readonly"-->
<!--            :validate-event="false"-->
<!--            :tabindex="multiple && filterable ? -1 : undefined"-->
<!--            role="combobox"-->
<!--            aria-autocomplete="none"-->
<!--            aria-haspopup="listbox"-->
<!--            @focus="handleFocus"-->
<!--            @blur="handleBlur"-->
<!--            @input="debouncedOnInputChange"-->
<!--            @paste="debouncedOnInputChange"-->
<!--            @compositionstart="handleComposition"-->
<!--            @compositionupdate="handleComposition"-->
<!--            @compositionend="handleComposition"-->
<!--          >-->
<!--            <template v-if="$slots.prefix" #prefix>-->
<!--              <div-->
<!--                style="height: 100%; display: flex; justify-content: center; align-items: center"-->
<!--              >-->
<!--                <slot name="prefix" />-->
<!--              </div>-->
<!--            </template>-->
<!--            <template #suffix>-->
<!--              <el-icon-->
<!--                v-if="iconComponent && !showClose"-->
<!--                :class="[nsSelect.e('caret'), nsSelect.e('icon'), iconReverse]"-->
<!--              >-->
<!--                <component :is="iconComponent" />-->
<!--              </el-icon>-->
<!--              <el-icon-->
<!--                v-if="showClose && clearIcon"-->
<!--                :class="[nsSelect.e('caret'), nsSelect.e('icon')]"-->
<!--                @click="handleClearClick"-->
<!--              >-->
<!--                <component :is="clearIcon" />-->
<!--              </el-icon>-->
<!--            </template>-->
<!--          </el-input>-->
<!--        </div>-->
<!--      </template>-->
<!--      <template #content> 234 </template>-->
<!--    </el-tooltip>-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped lang="scss"></style>-->
