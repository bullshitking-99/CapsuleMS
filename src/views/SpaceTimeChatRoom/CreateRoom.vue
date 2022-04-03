<template>
  <div class="container">
    <header>请选择聊天室类型</header>
    <main>
      <el-card class="classRoom" @click="toAttendance">
        <div class="card_content">
          <i class="el-icon-school"></i>
          <el-divider></el-divider>
          <div class="card_discription">
            课堂
          </div>
          <el-divider></el-divider>
        </div>
      </el-card>
      <el-card class="meeting">
        <div class="card_content">
          <i class="el-icon-office-building"></i>
          <el-divider></el-divider>
          <div class="card_discription">
            会议
          </div>
          <el-divider></el-divider>
        </div>
      </el-card>
      <el-card class="party">
        <div class="card_content">
          <i class="el-icon-goblet-square-full"></i>
          <el-divider></el-divider>
          <div class="card_discription">
            派对
          </div>
          <el-divider></el-divider>
        </div>
      </el-card>
    </main>
    <footer>@每个类型的聊天室都为专业人士量身定制</footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img_classRoom: "/assets/img/login-bg.jpg",
    };
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

<style scoped>
/* 关于 scoped 和 深度选择器 >>> (别名::v-deep，使用>>>会提示错误)
https://blog.csdn.net/wsln_123456/article/details/94382333?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_default&utm_relevant_index=2 */

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
:deep(.el-card) {
  width: 100%;
  height: 100%;
  border: none;
  transition: transform 0.3s;
}
:deep(.el-card:hover) {
  transform: scale(1.05);
  box-shadow: 3px 3px 7px #606266;
}
:deep(.el-card__body) {
  height: 100%;
  background-color: #409eff;
  border: none;
}

.card_content {
  color: aliceblue;
  font-size: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.card_content i {
  font-size: 120px;
  padding: 45px;
  padding-bottom: 5px;
}
.card_content .el-divider {
  height: 2px;
  width: 60%;
  margin: 20%;
  margin-bottom: 10px;
}
.card_content .card_discription {
  margin-bottom: -15%;
}

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
