<template>
  <el-descriptions
      class="margin-top"
      title="用户信息"
      :column="3"
      :size="size"
      border
  >
    <template #extra>
      <el-button type="primary" @click="dialogFormVisible = true">修改信息</el-button>
    </template>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <user/>
          </el-icon>
          用户名
        </div>
      </template>
      {{ userInfo.username }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <iphone/>
          </el-icon>
          手机号码
        </div>
      </template>
      {{ userInfo.phone }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <MessageBox/>
          </el-icon>
          邮箱
        </div>
      </template>
      {{ userInfo.email }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <Key/>
          </el-icon>
          性别
        </div>
      </template>
      {{ userInfo.sex }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <Food/>
          </el-icon>
          生日
        </div>
      </template>
      {{ userInfo.birthday }}
    </el-descriptions-item>
  </el-descriptions>
  <el-dialog v-model="dialogFormVisible" title="修改信息">
    <el-form
        :model="re_form"
        label-position="left"
        style="max-width: 320px"
        label-width="100px"
    >
      <el-form-item label="手机号码">
        <el-input v-model="re_form.phone"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="re_form.sex" placeholder="请选择">
          <el-option label="男" value="男"/>
          <el-option label="女" value="女"/>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="re_form.email"></el-input>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker
            v-model="re_form.birthday"
            type="date"
            placeholder="出生日期"
            style="width: 100%"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="save"
        >保存</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {computed, reactive, ref} from 'vue'
import request from "../axios"
import store from "../store/index"
import {Food, Iphone, Key, MessageBox, User,} from '@element-plus/icons-vue'
import {ElMessage} from 'element-plus'
import formatDate from "../utils";

console.log(Iphone, MessageBox, Food, Key, User)
const dialogFormVisible = ref(false)
const userInfo = reactive({
  username: 'None',
  phone: '110',
  email: '110@qq.com',
  sex: '男',
  birthday: '1999-06-02'
})

const re_form = reactive({
  phone: '',
  email: '',
  sex: '',
  birthday: ''
})

const size = ref('')
const iconStyle = computed(() => {
  const marginMap = {
    large: '8px',
    default: '6px',
    small: '4px',
  }
  return {
    marginRight: marginMap[size.value] || marginMap.default,
  }
})
const blockMargin = computed(() => {
  const marginMap = {
    large: '32px',
    default: '28px',
    small: '24px',
  }
  return {
    marginTop: marginMap[size.value] || marginMap.default,
  }
})

const re_dict = reactive({
  username: store.getters.get_username
})

const get_userInfo = async () => {
  const res = request.post(
      'http://127.0.0.1:5000/user/userInfo',
      re_dict
  )
  res.then(response => {
    // console.log(response.data)
    userInfo.username = response.data.data.userInfo.username
    userInfo.phone = response.data.data.userInfo.phone
    userInfo.email = response.data.data.userInfo.email
    userInfo.sex = response.data.data.userInfo.sex
    userInfo.birthday = response.data.data.userInfo.birthday
    store.commit('USERINFO', response.data.data.userInfo)
  })
}

const save = () => {
  console.log('userInfo', userInfo)
  console.log('re_form', re_form)
  console.log(typeof re_form.birthday)
  console.log(re_form.birthday)
  const is_true = (userInfo.phone === re_form.phone) +
      (userInfo.email === re_form.email) +
      (userInfo.sex === re_form.sex) +
      (userInfo.birthday === formatDate(re_form.birthday))
  if (is_true < 4) {
    // todo
    console.log(123)
  } else {
    ElMessage({
      showClose: true,
      message: "没有发生改变!",
      type: 'error'
    })
  }
}

get_userInfo()
// console.log(store.getters.get_username)
</script>

<style scoped>
.el-descriptions {
  margin-top: 20px;
}

.cell-item {
  display: flex;
  align-items: center;
}

.margin-top {
  margin-top: 20px;
}
</style>