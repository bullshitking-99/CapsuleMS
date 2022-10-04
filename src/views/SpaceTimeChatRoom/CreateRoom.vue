<template>
  <div class="container">
    <header id="headerTip">请选择聊天室类型</header>
    <main id="main">
      <el-card class="chatRoom classRoom" @click="clickClassRoom">
        <div class="card_content">
          <i class="el-icon-school"></i>
          <el-divider></el-divider>
          <div class="card_discription">
            课堂
          </div>
          <el-divider></el-divider>
        </div>
      </el-card>

      <el-card class="chatRoom meeting">
        <div class="card_content">
          <i class="el-icon-office-building"></i>
          <el-divider></el-divider>
          <div class="card_discription">
            会议
          </div>
          <el-divider></el-divider>
        </div>
      </el-card>

      <el-card class="chatRoom party">
        <div class="card_content">
          <i class="el-icon-goblet-square-full"></i>
          <el-divider></el-divider>
          <div class="card_discription">
            派对
          </div>
          <el-divider></el-divider>
        </div>
      </el-card>

      <div id="schoolList" v-if="showSchoolList">
        <el-table
          :data="schoolList"
          max-height="400"
          :header-cell-style="tableHeaderStyle"
          :cell-style="tableRowStyle"
          @cell-click="chooseSchool"
        >
          <el-table-column prop="schoolName" label="为每所高校定制专属时空" />
        </el-table>
      </div>
    </main>
    <footer>@每个类型的聊天室都为专业人士量身定制</footer>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"; // 从vuex中导入map解构
export default {
  data() {
    return {
      //学校列表表头样式 - shit般的组件，用对象传递样式
      tableHeaderStyle: {
        backgroundColor: "#409eff!important",
        color: "aliceblue",
        fontWeight: 400,
        borderRadius: "10px",
        textAlign: "center",
        fontSize: "20px",
        fontStyle: "italic",
      },
      //学校列表行样式
      tableRowStyle: {
        borderRadius: "10px",
        fontSize: "20px",
        textAlign: "center",
        cursor: "pointer",
      },
      showSchoolList: false,
      schoolList: [
        {
          schoolName: "北京工业大学",
          termBeginTime: "2022-08-22",
          weekNum: 19,
          classBeginTime_morning: "08:00",
          classBeginTime_afternoon: "14:00",
          classBeginTime_evening: "18:00",
          classNum: 12,
        },
        {
          schoolName: "北京大学工业学院",
          termBeginTime: "2022-04-01",
          weekNum: 19,
          classBeginTime_morning: "08:00",
          classBeginTime_afternoon: "14:00",
          classBeginTime_evening: "18:00",
          classNum: 12,
        },
        {
          schoolName: "北京航天大学",
          termBeginTime: "2022-04-01",
          weekNum: 19,
          classBeginTime_morning: "08:00",
          classBeginTime_afternoon: "14:00",
          classBeginTime_evening: "18:00",
          classNum: 12,
        },
        {
          schoolName: "北京理工大学",
          termBeginTime: "2022-04-01",
          weekNum: 19,
          classBeginTime_morning: "08:00",
          classBeginTime_afternoon: "14:00",
          classBeginTime_evening: "18:00",
          classNum: 12,
        },
        {
          schoolName: "北京交通大学",
          termBeginTime: "2022-04-01",
          weekNum: 19,
          classBeginTime_morning: "08:00",
          classBeginTime_afternoon: "14:00",
          classBeginTime_evening: "18:00",
          classNum: 12,
        },
      ],
    };
  },

  created() {},

  mounted() {
    this.clickToDisappear();
  },

  //computed是一个对象，不是函数
  computed: {
    ...mapState(["school"]),
  },

  methods: {
    // 解构vuex中的mapMutations
    ...mapMutations(["setSchool"]),

    //为卡片添加点击事件 => 为所有卡片添加渐变消失类disappear
    /*---------------------------------------------------------------------*/
    clickToDisappear() {
      let chatRoomList = document.querySelectorAll(".chatRoom");
      chatRoomList.forEach((card) => {
        card.addEventListener("click", () => {
          headerTip.classList.add("disappear");
          document.querySelectorAll(".chatRoom").forEach((card) => {
            //display无法实现过渡动画，需要先使用opacity，再进行display:none
            card.classList.add("disappear");
            setTimeout(() => {
              card.style.display = "none";
            }, 200);
          });
          console.log(card.classList[1] + " is clicked");
        });
      });
    },

    //classRoom卡片点击事件 => 更改提示标题，展示学校列表
    /*---------------------------------------------------------------------*/
    clickClassRoom() {
      //渐出
      setTimeout(() => {
        headerTip.innerText = "请选择所在学校";
        //使用原生dom+css复刻v-if效果
        headerTip.classList.remove("disappear");
        headerTip.classList.add("appear");
        //显示表格 使用v-if也会自动带有过渡效果
        this.showSchoolList = true;
        //表格居中
        main.style.justifyContent = "center";
      }, 300);
    },

    //学校选项点击事件 => 将学校附带信息存入vuex
    /*---------------------------------------------------------------------*/
    //版本 1 ，仅存入开学时间
    chooseSchool(row) {
      //获得当前点击行的数据对象
      console.log(`已选择${row.schoolName}`);

      //将学校信息存入state中
      this.setSchool(row);
      console.log("存入学校信息", this.school);

      //跳转页面
      this.$router.push("/attendance");
    },
  },
};
</script>

<style scoped>
/* 关于 scoped 和 深度选择器 >>> (别名::v-deep，使用>>>会提示错误)
https://blog.csdn.net/wsln_123456/article/details/94382333?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_default&utm_relevant_index=2 */

.container {
  height: 99%;
  padding: 0;
  position: relative;
  margin-left: 1%;
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

#schoolList {
  width: 50%;
}

.schoolList_show {
  opacity: 0;
}

/* 渐变消失效果 */
.disappear {
  transition: opacity 0.3s;
  opacity: 0;
}

/* 渐变出现效果 */
.appear {
  transition: opacity 0.3s;
  opacity: 1;
}

:deep(tbody .cell) {
  transition: all 0.3s ease;
}

:deep(tbody .cell:hover) {
  transform: scale(1.1);
  color: #000;
}
</style>
