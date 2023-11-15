<template>
  <div class="app">
    <router-view></router-view>
    <h2>标题</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {}
})
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
