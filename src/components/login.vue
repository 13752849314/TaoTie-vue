<template>
  <el-row justify="center">
    <el-col :xl="6" :lg="7">
      <div class="grid-content ep-bg-purple"/>
      <p>饕餮系统</p>
      <el-image :src="logo" style="width: 200px; height: 200px"></el-image>
      <p>create by happygh0st</p>
    </el-col>
    <el-col :span="1">
      <div class="grid-content ep-bg-purple-light"/>
      <el-divider direction="vertical"/>
    </el-col>
    <el-col :xl="6" :lg="7">
      <div class="grid-content ep-bg-purple"/>
      <el-form
          label-position="top"
          label-width="100px"
          :model="login_from"
          style="max-width: 280px"
          ref="ruleFormRef"
          :rules="rules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="login_from.username" clearable/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="login_from.password" type="password" clearable show-password/>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <div id="code">
            <el-input v-model="login_from.code"/>
          </div>
          <div id="code_img">
            <el-image :src="image.image" style="width: 80px; height: 32px" @click="getImage"></el-image>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login(ruleFormRef)">登录</el-button>
          <el-button @click="reset(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import logo from '../assets/logo.jpg'
import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import request from '../axios'
import router from '../router/index'
import store from '../store/index'

console.log(logo)
const ruleFormRef = ref<FormInstance>()
const image = reactive({
  image: ''
})

const login_from = reactive({
  username: '',
  password: '',
  code: '',
  token: ''
})

const rules = reactive<FormRules>({
  username: [
    {required: true, message: '用户名不能为空!', trigger: 'blur'}
  ],
  password: [
    {
      required: true,
      message: '密码不能为空!',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '验证码不能为空!',
      trigger: 'blur'
    },
    {
      min: 5,
      max: 5,
      message: '长度不为5!',
      trigger: 'blur'
    }
  ]
})

const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // console.log(login_from)
      const res = request.post(
          "http://127.0.0.1:5000/login",
          login_from
      )
      const result = res.then(response => {
        // localStorage.setItem('token', response.data.data.jwt)
        store.commit('JWT_COMMIT', response.data.data.jwt)
        // console.log('jwt:->', response.data.data.jwt)
        store.commit('USERNAME', login_from.username)
      })
      router.push('/home')
    } else {
      console.log('error submit!', fields)
    }
  })
}
const reset = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const getImage = () => {
  const res = request.get('http://127.0.0.1:5000/image')
  const result = res.then(result => {
    image.image = result.data.data.image
    login_from.token = result.data.data.token
  })
}
getImage()

</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
  height: 100%;
  align-items: center;
  text-align: center;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.el-divider {
  height: 300px;
}

#code {
  height: 32px;
  /*border: solid 1px red*/
}

#code_img {
  float: left;
  /*border: solid 1px green;*/
  height: 32px;
  width: 80px;
}
</style>