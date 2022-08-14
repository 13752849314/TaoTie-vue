<template>
  <div class="row">
    <el-row>
      <el-col :span="24">
        <div class="grid-content ep-bg-purple-dark"/>
        <a href="https://github.com/13752849314/Taotie-vue" style="text-decoration: none" target="_blank"><p>饕餮记账系统</p></a>
      </el-col>
    </el-row>

    <el-row style="height: 150px">
      <el-col :span="24">
        <div class="grid-content ep-bg-purple-dark"/>
        <img id="logo" src="../assets/logo.jpg" alt="加载失败!">
      </el-col>
    </el-row>


    <el-row style="height: 50px">
      <el-col :span="24">
        <div class="grid-content ep-bg-purple-dark"/>
        <div id="butt">
          <el-button type="primary" size="large" @click="login">登录</el-button>
          <el-button type="success" size="large" @click="reg">注册</el-button>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script setup>
import router from "../router";

function login(){
  router.push('login')
}
function reg(){
  router.push("reg")
}

</script>

<style scoped>
.row {
  width: 500px;
  height: 400px;
  /*border: solid 1px red;*/
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

p {
  text-align: center;
  color: black;
  font-size: 33px;
}

#logo {
  width: 150px;
  height: 150px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

#butt {
  /*border: solid 1px red;*/
  height: 50px;
  margin-top: 10px;
  text-align: center;
}

.el-row {
  margin-bottom: 20px;
  /*border: solid 1px green;*/
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}


</style>