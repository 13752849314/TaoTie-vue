<template>
  <div>
    <p>我的账单<el-button type="success" size="small">添加记录</el-button></p>
  </div>

  <el-table :data="tableData" height="450" border style="width: 100%" max-height="540">
    <el-table-column prop="Username" label="用户名"></el-table-column>
    <el-table-column prop="Type" label="消费类型"></el-table-column>
    <el-table-column prop="Money" sortable label="消费金额"></el-table-column>
    <el-table-column prop="Time" sortable label="消费时间"></el-table-column>
    <el-table-column prop="Meg" label="备注"></el-table-column>
    <el-table-column label="操作">
      <template #default>
        <el-button link type="primary" size="small">修改</el-button>
        <el-button link type="danger" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
const tableData = [
  {
    Username: 'hg',
    Type: 0,
    Money: 12.5,
    Time: "2022-07-12 12:23:12",
    Meg: '37837'
  },
  {
    Username: 'hg',
    Type: 0,
    Money: 12.5,
    Time: "2022-07-12 12:23:12",
    Meg: '37837'
  },
  {
    Username: 'hg',
    Type: 0,
    Money: 12.5,
    Time: "2022-07-12 12:23:12",
    Meg: '37837'
  },
  {
    Username: 'hg',
    Type: 0,
    Money: 12.5,
    Time: "2022-07-12 12:23:12",
    Meg: '37837'
  },
]
const item = {
  Username: 'hg',
  Type: 0,
  Money: 12.5,
  Time: "2022-07-12 12:23:12",
  Meg: '37837'
}
for (let i = 0; i < 100; i++) {
  item.Money = i + 0.1
  tableData.push(item)
}
</script>

<style scoped>

</style>