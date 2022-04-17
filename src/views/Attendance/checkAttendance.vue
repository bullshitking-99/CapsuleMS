<template>
  <div>
    <div class="crumbs" style="display:flex;justify-content:center;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-s-order"></i> 课堂考勤
        </el-breadcrumb-item>
        <el-breadcrumb-item> <i></i>查看考勤 </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <!--课程名称选择栏-->

      <el-form
        label-width="120px"
        style="display:flex;justify-content:center;align-items:center "
      >
        <el-form-item label="课程名称">
          <el-select
            v-model="selectedClassRoom"
            style="width: 300px"
            placeholder="请选择"
            @change="displayCard"
          >
            <el-option
              v-for="item in classRoomList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>

      <!--使用Card组件显示选中课程的各周签到情况-->
      <div
        v-if="chooseClassRoom"
        style="display:flex; flex-wrap:wrap; justify-content:flex-start;"
      >
        <!--根据周数渲染的卡片，可用于展示当周签到信息-->
        <el-card
          v-for="(card, cardIndex) in classRoomCard_List"
          :key="card"
          class="box-card"
          @click="view_atdTable(card.begin_date)"
          shadow="hover"
        >
          <template #header>
            <div class="card-header">
              <span>第{{ cardIndex + 1 }}次</span>
              <el-button class="button" type="primary" plain
                ><i class="el-icon-document"></i>
                查看考勤表
              </el-button>
            </div>
          </template>
          <div class="card-content">
            <p>课程名称：{{ card.name }}</p>
            <hr />
            <p>开始时间：{{ card.begin_date }}</p>
            <hr />
            <p>课程地点：{{ card.location }}</p>
          </div>
        </el-card>
        <!--独立卡片，点击下载签到总览表-->
        <el-card
          class="box-card "
          body-style="height:202.5px ; padding:0;background-color:#66b1ff;color:#FFF;display:flex;justify-content:center;align-items:center"
          @click="download_atdTable"
        >
          <h2><i class="el-icon-download"></i>下载签到总览表</h2>
        </el-card>
      </div>

      <!--点击卡片后换出抽屉drawer，能展示当前周的签到情况-->
      <el-drawer v-model="drawer">
        <template v-slot:title>
          <div style="color:#242f42; text-align:center;font-size:30px;">
            <b>签到信息表</b>
            <hr
              style="margin: 15px;border: none;height: 2px;background-color: #606266;"
            />
          </div>
        </template>
        <!--drawer中嵌套的签到信息表-->
        <el-table
          class="table"
          :data="gridData"
          show-summary
          :summary-method="get_stuNum"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          :max-height="window_height"
        >
          <el-table-column property="name" label="姓名"></el-table-column>
          <el-table-column property="id" label="学号"></el-table-column>
        </el-table>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import http from "@/api/chatroom";
export default {
  //data is a function
  data() {
    return {
      userId: "",
      dataWareHouse: [],
      myClassRoom: [], //纯纯存放该用户创建的课程名
      selectedClassRoom: "",
      classRoomList: [], //给input喂食
      classRoomCard_List: [], //给card喂食
      chooseClassRoom: false, //点击选择框后进行卡片渲染
      drawer: false, //抽屉需要使用的变量，用以设定是否显示
      //表格使用数据
      gridData: [],
      window_height: "", //签到信息表的max-height应根据屏幕高度动态改变
    };
  },
  created() {
    this.userId = JSON.parse(localStorage.getItem("user")).id;
    //console.log(this.userId);
    this.getclassnames();
    this.window_height = document.body.clientHeight * 0.8;
  },

  //methods is a object
  methods: {
    //点击select获取该用户的课程名
    /*---------------------------------------------------------------------*/
    getclassnames() {
      //接口获取该用户的所有签到课堂信息（同名多周课堂会有多个对象，每个对象为一个聊天室
      http.findMyClassRooms(this.userId).then((res) => {
        this.dataWareHouse = res;
        //console.log(this.dataWareHouse);
        res.forEach((element) => {
          this.myClassRoom.push(element.name);
        });
        //给classname去重
        this.myClassRoom = [...new Set(this.myClassRoom)];
        //console.log(this.myClassRoom);

        //根据classname的值按指定格式创建组件需要的classroomlist数组
        this.myClassRoom.forEach((ele) => {
          let classroom = {};
          classroom.label = ele;
          classroom.value = ele;
          //console.log(classroom);
          this.classRoomList.push(classroom);
        });
      });
    },

    //根据用户选定的课程名渲染周数个卡片，展示每周的签到情况
    /*---------------------------------------------------------------------*/
    displayCard() {
      //选中的课程名：selectedClassRoom
      //填充：classRoomCard_Lit
      this.classRoomCard_List = []; //开局清空，以防止多次点击选择框而卡片叠加
      this.dataWareHouse.forEach((e) => {
        //console.log(this.selectedClassRoom);
        if (e.name === this.selectedClassRoom) {
          let classRoomCard = {};
          classRoomCard.name = e.name;
          classRoomCard.begin_date = e.start_TIME.split(" ")[0];
          classRoomCard.location = e.location;
          //console.log(classRoomCard);
          this.classRoomCard_List.push(classRoomCard);
        }
      });
      //console.log(this.classRoomCard_List);
      this.chooseClassRoom = true;
    },

    // 使用drawer查看考勤表 具体周卡片点击事件
    /*---------------------------------------------------------------------*/
    view_atdTable(date) {
      //每次查看时清空，避免数据叠加
      this.gridData = [];
      //接口所需数据：date & course
      //console.log(date);
      let param = {
        params: {
          date: date,
          course: this.selectedClassRoom,
        },
      };
      //接口请求签到表 获取stu_list 放入drawer中的table数据里
      http.findBySearch(param).then((res) => {
        //console.log(res);
        res.data.stulist.forEach((e) => {
          let stu = {};
          stu.name = e.name;
          stu.id = e.number;
          this.gridData.push(stu);
        });
      });
      //打开drawer开关
      this.drawer = true;
    },

    // drawer中签到信息表的合计行方法
    /*---------------------------------------------------------------------*/
    get_stuNum(param) {
      //console.log(param);
      const { data } = param;
      const sums = [];
      sums[0] = "签到人数: ";
      sums[1] = data.length;
      return sums;
    },

    //下载签到总览表 总览卡片点击事件
    /*---------------------------------------------------------------------*/
    download_atdTable() {
      //准备总览表需要的参数
      let teachername = JSON.parse(localStorage.getItem("user")).name;
      let course = this.selectedClassRoom;
      //console.log(teachername);
      //console.log(course);
      let dates = [];
      this.classRoomCard_List.forEach((e) => {
        dates.push(e.begin_date);
      });
      dates = dates.join("&dates=");
      //console.log(dates);
      window.location.href =
        "http://39.106.39.49:8888/getexcel/?course=" +
        course +
        "&dates=" +
        dates +
        "&teachername=" +
        teachername;
    },
  },
};
</script>

<style scoped>
.container {
  padding: 30px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 260px;
  margin-left: 20px;
  margin-bottom: 20px;
  transition: all 0.3s;
}
.box-card:hover {
  transform: scale(1.05);
}
.card-content hr {
  margin: 5px;
  margin-left: 15px;
  width: 15%;
  border: none;
  height: 1px;
  background-color: #409eff;
}
.is-leaf .cell {
  text-align: center;
  font-weight: bold;
  color: black;
}
</style>
