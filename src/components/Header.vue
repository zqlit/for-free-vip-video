<template>
  <lew-flex style="width: 300px" :gap="20" x="start" direction="y">
    <lew-input v-model="v" disabled />
  </lew-flex>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const v = ref('这是禁用状态')
</script>

<style scoped>
.demo {
    display: flex;
    justify-content: center;
    align-items: center;
}

.lew-flex {
    border: 1px var(--lew-bgcolor-2) solid;
    border-radius: var(--lew-border-radius-small);
    /* background-color: var(--lew-bgcolor-1); */
    margin-bottom: 20px;
    width: 200px;
    height: 200px;
    padding: 5px;
    box-sizing: border-box;
    margin: 10px;

    .box {
        box-sizing: border-box;

        >div {
            display: inline-block;
            padding: 10px;
            font-size: 14px;
            border-radius: var(--lew-border-radius-small);
            background-color: var(--lew-color-primary);
        }
    }
}
</style>