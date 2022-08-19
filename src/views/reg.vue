<template>
  <p style="text-align: center; font-size: 30px; color: #4924e7">欢迎注册饕餮记账</p>
  <div id="reg">
    <el-form
        label-position="left"
        label-width="100px"
        :model="reg_form"
        style="max-width: 320px"
        ref="ruleRef"
        :rules="rules"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="reg_form.username" clearable/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="reg_form.password" type="password" clearable show-password/>
      </el-form-item>
      <el-form-item label="确定密码" prop="password2">
        <el-input v-model="reg_form.password2" type="password" clearable show-password/>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="reg_form.phone" clearable/>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="reg_form.email" clearable/>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="reg_form.sex">
          <el-radio label="男"/>
          <el-radio label="女"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday">
        <el-date-picker
            v-model="reg_form.birthday"
            type="date"
            placeholder="请输入日期"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleRef)"
        >注册
        </el-button
        >
        <el-button @click="resetForm(ruleRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from "element-plus";
import formatDate from '../utils'
import request from '../axios'
import router from '../router/index'

const ruleRef = ref<FormInstance>()

const password1 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('密码不能为空!'))
  } else {
    if (reg_form.password2 !== '') {
      if (!ruleRef.value) return
      ruleRef.value.validateField('password2', () => null)
    }
    callback()
  }
}
const password2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码!'))
  } else if (value !== reg_form.password) {
    callback(new Error("两次密码不同!"))
  } else {
    callback()
  }
}

const check_phone = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入手机号码!'))
  } else {
    let myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/
    if (value.length < 11 || !myreg.test(value)) {
      callback(new Error('输入格式不正确!'))
    } else {
      callback()
    }
  }
}
// ^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$
const check_email = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入邮箱!'))
  } else {
    let myreg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (!myreg.test(value)) {
      callback(new Error('输入格式不正确!'))
    } else {
      callback()
    }
  }
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      reg_form.birthday = formatDate(reg_form.birthday)
      // console.log(reg_form)
      const res = request.post(
          'http://127.0.0.1:5000/register',
          reg_form
      )
      res.then(respone => {
        router.push('login')
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const reg_form = reactive({
  username: '',
  password: '',
  password2: '',
  phone: '',
  email: '',
  sex: '男',
  birthday: ''
})


const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      message: '用户名不能为空!',
      trigger: 'blur'
    }
  ],
  password: [
    {
      validator: password1,
      trigger: 'blur'
    }
  ],
  password2: [
    {
      validator: password2,
      trigger: 'blur'
    }
  ],
  phone: [
    {
      validator: check_phone,
      trigger: 'blur'
    }
  ],
  email: [
    {
      validator: check_email,
      trigger: 'blur'
    }
  ],
  birthday: [
    {
      required: true,
      message: '请输入日期!',
      trigger: 'blur'
    }
  ]
})

</script>

<style scoped>
#reg {
  width: 320px;
  height: 400px;
  /*border: solid 1px red;*/
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
</style>