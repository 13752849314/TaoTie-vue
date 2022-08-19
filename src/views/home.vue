<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px" style="border-right: solid 4px #0dd21c">
        <Menu></Menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <strong style="font-size: 20px;font-size: 25px;color: #0dd21c">饕餮记账系统</strong>
          <div class="header-avatar">
            <el-avatar :src="userInfo.avatar"></el-avatar>
            <el-dropdown>
            <span class="el-dropdown-link">
              {{ userInfo.username }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <router-link to="/userCenter">个人中心</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item @click="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-link href="https://github.com/13752849314/Taotie-vue" target="_blank">TaoTie-vue</el-link>
            <el-link href="https://github.com/13752849314/Taotie-python" target="_blank">TaoTie-python</el-link>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {reactive} from 'vue'
import Menu from '../components/Menu.vue'
import store from "../store/index"
import request from "../axios.js"
import router from "../router/index.js"

const userInfo = reactive({
  avatar: 'https://camo.githubusercontent.com/ee0709d1613b7c1453048e628226fa01cb2d58f1b137403fc9338983753ea671/68747470733a2f2f7261772e6769746875622e636f6d2f31333735323834393331342f4d4c2f6d61696e2f696d6167652f68672e706e67',
  username: ''
})

const logout = () => {
  const res = request.post('http://127.0.0.1:5000/logout', {username: userInfo.username})
  res.then(response => {
    router.push('/')
  })
}

userInfo.username = store.getters.get_username
</script>

<style scoped>
.common-layout {
  height: 100%;
  text-align: center;
}

section {
  height: 100%;
}

.header {
  align-items: center;
  /*border: solid 1px red;*/
  border-bottom: solid 4px #0dd21c;
}

.header-avatar {
  float: right;
  width: 300px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

a {
  text-decoration: none;
}
</style>