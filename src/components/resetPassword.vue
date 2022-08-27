<template>
  <div id="reset_pw">
    <h4>修改密码</h4>
    <el-form
        label-width="100px"
        label-position="left"
        style="max-width: 320px"
        :model="re_pw"
        ref="ruleRef"
        :rules="rules"
    >
      <el-form-item label="输入密码" prop="password">
        <el-input v-model="re_pw.password" type="password" clearable show-password/>
      </el-form-item>
      <el-form-item label="新密码" prop="new_pw">
        <el-input v-model="re_pw.new_pw" type="password" clearable show-password/>
      </el-form-item>
      <el-form-item label="再次输入" prop="new_pw2">
        <el-input v-model="re_pw.new_pw2" type="password" clearable show-password/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="reset_pw(ruleRef)">确定</el-button>
        <el-button @click="reset(ruleRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue"
import type {FormInstance, FormRules} from 'element-plus'
import request from "../axios.js"
import store from "../store/index.js"

const ruleRef = ref<FormInstance>()
const re_pw = reactive({
  password: '',
  new_pw: '',
  new_pw2: '',
  username: store.getters.get_username
})

function passwordFilter(rule: any, value: any, callback: any) {
  if (value === '') {
    callback(new Error('请输入密码!'))
  } else {
    callback()
  }
}

function newPasswordFilter(rule: any, value: any, callback: any) {
  if (re_pw.new_pw === '') {
    callback(new Error('上一项未输入!'))
  } else {
    if (re_pw.new_pw === value) {
      callback()
    } else {
      callback(new Error('两次密码不同!'))
    }
  }
}

const rules = reactive<FormRules>({
  password: [
    {
      validator: passwordFilter,
      trigger: 'blur'
    }
  ],
  new_pw: [
    {
      required: true,
      message: '新密码不能为空!',
      trigger: 'blur'
    }
  ],
  new_pw2: [
    {
      validator: newPasswordFilter,
      trigger: 'blur'
    }
  ]
})

const reset = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const reset_pw = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      const res = request.post('http://127.0.0.1:5000/user/resetPW', re_pw)
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style scoped>
#reset_pw {
  /*border: solid 1px red;*/
  width: 350px;
  margin-top: 30px;
}
</style>