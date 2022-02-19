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
            @focus="getclassnames"
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

      <!--签到情况显示表-->
      <div class="table">
        <el-table
          :data="tableData"
          :row-class-name="tableRowClassName"
          style="width: 100%"
          height="350"
          max-height="1000"
          show-summary
          :summary-method="getSummaries"
          @filter-change="numCounter_filter"
        >
          <el-table-column
            prop="date"
            label="日期"
            :filters="date_filter"
            :filter-method="filterHandler"
            width="180"
            column-key="date"
          >
          </el-table-column>
          <el-table-column prop="time" sortable label="时间" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名"> </el-table-column>
        </el-table>
      </div>
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
      myClassRoom: [],
      selectedClassRoom: "",
      classRoomList: [],
      //表格使用数据
      atd_num: 0, //签到人数
      late_num: 0, //迟到人数
      atd_time: "15:00:00", //签到截止时间，在此时间之后就被判为迟到
      date_filter: [
        { text: "第一周", value: "2016-05-01" },
        { text: "第二周", value: "2016-05-02" },
        { text: "第三周", value: "2016-05-03" },
      ],
      tableData: [
        {
          date: "2016-05-01",
          time: "12:03:00",
          name: "王小虎",
        },
        {
          date: "2016-05-02",
          time: "13:03:00",
          name: "王小虎",
        },
        {
          date: "2016-05-01",
          time: "14:03:00",
          name: "赵小龙",
        },
        {
          date: "2016-05-01",
          time: "15:03:00",
          name: "陆小凤",
        },
        {
          date: "2016-05-01",
          time: "16:03:00",
          name: "马飞飞",
        },
        {
          date: "2016-05-03",
          time: "15:03:00",
          name: "王小虎",
        },
      ],
    };
  },
  created() {
    this.numCounter();
    this.userId = JSON.parse(localStorage.getItem("user")).id;
    //console.log(this.userId);
  },

  //methods is a object
  methods: {
    //点击select获取该用户的课程名
    getclassnames() {
      //接口获取该用户的所有签到课堂信息（同名多周课堂会有多个对象，每个对象为一个聊天室
      http.findMyClassRooms(this.userId).then((res) => {
        res.forEach((element) => {
          this.myClassRoom.push(element.name);
        });
        //给classname去重
        this.myClassRoom = [...new Set(this.myClassRoom)];
        console.log(this.myClassRoom);

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
    //:row-class-name会传入一个对象作为参数:{row:{date,time,name..}, rowIndex:},所以下面这个函数的参数需要使用解构赋值
    tableRowClassName({ row }) {
      if (row.time > this.atd_time) {
        return "late-row";
      }
      return "";
    },
    //日期列筛选方法 这个函数会执行row.length次
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    //初始合计行
    numCounter() {
      this.tableData.forEach((value) => {
        this.atd_num++;
        if (value.time > this.atd_time) {
          this.late_num++;
        }
      });
    },
    //合计行动态修改 - 计算人数
    numCounter_filter(obj) {
      this.atd_num = 0;
      this.late_num = 0;
      //获取选择的筛选条件
      //console.log(obj.date[0]); //太不容易了，心累
      let filterDate = obj.date[0];
      this.tableData.forEach((value) => {
        if (value.date === filterDate) {
          this.atd_num++;
          if (value.time > this.atd_time) {
            this.late_num++;
          }
        }
      });
      //筛选条件重置时会触发
      if (!obj.date[0]) {
        this.atd_num = 0;
        this.late_num = 0;
        //console.log("111");
        this.numCounter();
      }
    },
    //总计行计算逻辑
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "签到人数：" + this.atd_num + "人";
          return;
        }
        if (index === 1) {
          sums[index] = "迟到人数：" + this.late_num + "人";
        }
      });
      return sums;
    },
  },
};
</script>

<style>
.container {
  padding: 30px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.table {
  width: 550px;
  margin-left: 50px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.el-table .late-row {
  background: #b0e0e6;
}
</style>
