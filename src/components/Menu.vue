<template>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      active-text-color="#0dd21c"
      background-color="rgba(178, 253, 125, 0.66)"
  >
    <router-link to="/user/sb">
      <el-menu-item index="1">
        <template #title>
          <el-icon>
            <House></House>
          </el-icon>
          <span>账单查看</span>
        </template>
      </el-menu-item>
    </router-link>
    <el-menu-item index="2">
      <template #title>
        <el-icon>
          <Location></Location>
        </el-icon>
        <span>账单管理</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import {
  House,
  Location
} from '@element-plus/icons-vue'
</script>

<style scoped>
a{
  text-decoration: none;
}
</style>