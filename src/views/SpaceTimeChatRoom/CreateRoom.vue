<template>
  <div class="container">
    <header>请选择聊天室类型</header>
    <main>
      <el-card class="classRoom" @click="toAttendance">
        课堂
      </el-card>
      <el-card class="meeting">
        会议
      </el-card>
      <el-card class="party">
        派对
      </el-card>
    </main>
    <footer>@每个类型的聊天室都为专业人士量身定制</footer>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {
    //点击课堂卡片跳转至 添加课堂考勤 页面
    /*---------------------------------------------------------------------*/
    toAttendance() {
      this.$router.replace("/attendance");
    },
  },
};
</script>

<style>
.container {
  height: 100%;
  padding: 0;
  position: relative;
}
header {
  font-size: 60px;
  font-style: italic;
  text-align: center;
  color: #606266;
  margin: 40px 0 0 0;
}
main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70%;
  margin: 0 10%;
}
main > div {
  width: 25%;
  height: 80%;
}
main .el-card {
  width: 100%;
  height: 100%;
  border: none;
  transition: all 0.3s;
}
.el-card:hover {
  transform: scale(1.05);
  box-shadow: 3px 3px 7px #606266;
}
.el-card__body {
  height: 100%;
  background-color: #409eff;
  color: aliceblue;
  font-size: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* .classRoom {
  background-image: url(../assets/img/classRoom.jpg);
} */
footer {
  position: absolute;
  bottom: 0%;
  left: 0%;
  right: 0%;
  font-size: 20px;
  font-style: italic;
  background-color: #c0c4cc;
  color: #909399;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
