<template>
  <div>
    <h2>主页面</h2>
    <!-- <el-button>哈哈哈</el-button> -->

    <el-row class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { ElButton } from 'element-plus'
// import 'element-plus/theme-chalk/base.css'
// import 'element-plus/theme-chalk/el-button.css'

export default defineComponent({
  // components: { ElButton },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
