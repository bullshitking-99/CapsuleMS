<template>
  <div>
    <div class="crumbs" style="display:flex;justify-content:center;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-s-order"></i>课堂考勤
        </el-breadcrumb-item>
        <el-breadcrumb-item> <i></i>增加考勤 </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div
      class="container"
      style="width:97%;display:flex;justify-content:center;align-items:center "
    >
      <div class="form-box">
        <!-- 课堂名称与课堂教室 共一个el-form -->
        <el-form label-width="100px">
          <el-form-item label="课程名称">
            <el-input
              v-model="form.name"
              placeholder="请输入课程名称"
            ></el-input>
          </el-form-item>

          <el-form-item label="课程教室" prop="location">
            <el-select
              v-model="form.location"
              value-key="field"
              multiple
              placeholder="请选择课程教室"
              style="width: 100%"
            >
              <el-option
                v-for="item in locationList"
                :key="item.field"
                :value="item"
                :label="item.location"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <!--学期开始时间-->
          <el-form-item label="开学时间">
            <el-date-picker
              v-model="term_beginTime"
              type="date"
              placeholder="请设置学期开始时间"
              format="YYYY/MM/DD"
              style="width: 100%"
              @change="getTerm_beginTime"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>

        <!-- 课堂日期 使用单选Radio按钮 -->
        <el-form label-width="100px">
          <el-form-item label="课程日期">
            <el-row type="flex" justify="center">
              <el-radio-group v-model="ClassTime_day" size="small">
                <el-radio-button label="1">周一</el-radio-button>
                <el-radio-button label="2">周二</el-radio-button>
                <el-radio-button label="3">周三</el-radio-button>
                <el-radio-button label="4">周四</el-radio-button>
                <el-radio-button label="5">周五</el-radio-button>
                <el-radio-button label="6">周六</el-radio-button>
                <el-radio-button label="0">周日</el-radio-button>
              </el-radio-group>
            </el-row>
          </el-form-item>
        </el-form>

        <!-- 课堂日期时间 行内使用两个级联选择器 -->
        <el-form :inline="true" label-width="100px" style="width:800px">
          <el-form-item label="签到起始时间">
            <el-cascader
              v-model="atdTime_s"
              :options="options_s"
              :props="{ expandTrigger: 'hover' }"
              style="width:170px"
            ></el-cascader>
          </el-form-item>
          <el-form-item>
            <el-form-item label="签到持续时间" label-width="100px">
              <el-select
                v-model="atd_DuringTime"
                style="width: 170px"
                placeholder="请选择"
                @change="countEndTime"
              >
                <el-option
                  v-for="item in time_Options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form-item>
        </el-form>

        <!-- 签到周期 使用slider滑块 进行区域选择-->
        <el-form label-width="100px">
          <el-form-item label="签到周期">
            <el-slider
              v-model="atdWeeks"
              range
              :marks="marks"
              :step="5"
              show-stops
              :show-tooltip="false"
            >
            </el-slider>
          </el-form-item>
        </el-form>
        <!-- 提交与重置按钮 -->
        <el-form label-width="200px" style="margin-top: 50px">
          <el-form-item>
            <el-button type="primary" :style="inputStyle" @click="onSubmit"
              >提交</el-button
            >
            <el-button style="margin-left: 80px" @click="onReset"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/api/chatroom";
export default {
  data() {
    return {
      //登录后存储在本地的user信息
      user: {},
      userId: "",
      //收集组件在页面接收的数据
      form: {
        name: "",
        s_time: "",
        e_time: "",
        location: [],
        RESERVE: 0,
      },
      //请求获取已有的聊天室地址
      locationList: [],
      //学期开始时间
      term_beginTime: "",
      //学期开始时间
      term_endTime: "",
      //课程日期
      ClassTime_day: "1",
      //级联选择器选项-签到起始时间
      atdTime_s: [],
      options_s: [
        {
          value: "1",
          label: "上午",
          children: [
            {
              value: "08:00:00",
              label: "第一节课",
            },
            {
              value: "08:50:00",
              label: "第二节课",
            },
            {
              value: "09:55:00",
              label: "第三节课",
            },
            {
              value: "10:45:00",
              label: "第四节课",
            },
          ],
        },
        {
          value: "2",
          label: "下午",
          children: [
            {
              value: "13:30:00",
              label: "第五节课",
            },
            {
              value: "14:20:00",
              label: "第六节课",
            },
            {
              value: "15:25:00",
              label: "第七节课",
            },
            {
              value: "16:15:00",
              label: "第八节课",
            },
          ],
        },
        {
          value: "3",
          label: "晚上",
          children: [
            {
              value: "18:00:00",
              label: "第九节课",
            },
            {
              value: "18:50:00",
              label: "第十节课",
            },
            {
              value: "19:55:00",
              label: "第十一节课",
            },
            {
              value: "20:45:00",
              label: "第十二节课",
            },
          ],
        },
      ],
      //select选择器选项-签到持续时间
      atd_DuringTime: "",
      time_Options: [
        {
          value: "5",
          label: "五分钟",
        },
        {
          value: "10",
          label: "十分钟",
        },
        {
          value: "15",
          label: "十五分钟",
        },
      ],
      atdTime_e: "",
      //范围滑块-签到周期
      atdWeeks: [15, 50], //除以5就是代表的周数
      marks: {
        5: "1",
        10: "2",
        15: "3",
        20: "4",
        25: "5",
        30: "6",
        35: "7",
        40: "8",
        45: "9",
        50: "10",
        55: "11",
        60: "12",
        65: "13",
        70: "14",
        75: "15",
        80: "16",
        85: "17",
        90: "18",
        95: "19",
      },
    };
  },
  created() {
    this.getUser();
    this.getLocation();
  },
  mounted() {},

  computed: {
    //提交按钮不可选样式
    inputStyle: function() {
      let style = {};
      if (
        !this.form.name ||
        !this.form.location.length ||
        !this.atdTime_s.length ||
        !this.atdTime_e.length
      ) {
        style.color = "#fffcff";
        style.backgroundColor = "#83c0ff";
        style.borderColor = "#fffdff";
      }
      return style;
    },
  },

  methods: {
    //动态实时修改签到结束时间选项的disabled - 版本2弃用
    /*    changeDisabled_end() {
      //console.log(this.atdTime_s[1]);
      this.options_e.forEach((value) => {
        if (value.value < this.atdTime_s[0]) {
          value.disabled = true;
        }
        value.children.forEach((value) => {
          if (value.value < this.atdTime_s[1]) {
            value.disabled = true;
          }
        });
      });
    }, */
    //获取签到结束时间 用个temp感觉很扎眼，肯定可以优化
    countEndTime() {
      //使用countTime函数得出签到结束时间
      let duringtime = parseInt(this.atd_DuringTime);
      //console.log(duringtime);
      let temp = "2020-10-28 ";
      temp = temp + this.atdTime_s[1];
      let type = "m";
      let D = this.countTime(temp, type, duringtime);
      this.atdTime_e = D.split(" ")[1];
      //console.log(D);
      //console.log(this.atdTime_e);
    },
    /**
     * 时间加减
     * @param date - 时间格式支持yyyy-MM-dd HH:mm:ss | yyyy/MM/dd HH:mm:ss
     * @param type - 类型：h-小时加减 m-分钟加减 s-秒加减 mi-毫秒加减
     * @param number - 加减的数值，负数表示减
     * @return dateCalc - 加减后的时间，格式yyyy-MM-dd HH:mm:ss
     */
    countTime(date, type, number) {
      var timestamp1 = Date.parse(new Date(date));
      if (isNaN(timestamp1)) {
        //兼容IE,safari...
        date = date.replace(/-/gi, "/");
        timestamp1 = Date.parse(new Date(date));
      }
      var timestamp2;
      switch (type) {
        case "h":
          timestamp2 = timestamp1 + number * 60000 * 60;
          break;
        case "m":
          timestamp2 = timestamp1 + number * 60000;
          break;
        case "s":
          timestamp2 = timestamp1 + number * 1000;
          break;
        case "mi":
          timestamp2 = timestamp1 + number;
          break;
      }
      var date = new Date(timestamp2);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    /* -------------------------------------------------------------------------------------------- */
    //用户选择学期开始时间时触发
    getTerm_beginTime() {
      // console.log(this.term_beginTime);
      //时间格式转换 函数有点拉，直接toISOstring然后切片就行了
      let changeTimeStyle = function(oldTime) {
        // 时间转换
        let datejson = new Date(oldTime).toJSON();
        let date = new Date(+new Date(datejson) + 8 * 3600 * 1000)
          .toISOString()
          .replace(/T/g, " ")
          .replace(/\.[\d]{3}Z/, "");
        return date.split(" ")[0];
      };
      this.term_beginTime = changeTimeStyle(this.term_beginTime);
      //console.log(this.term_beginTime);
      //获取学期结束时间 133=19*7
      let term_endTime = new Date(this.term_beginTime);
      term_endTime = term_endTime.setDate(term_endTime.getDate() + 133); //变成时间戳
      term_endTime = new Date(term_endTime);
      this.term_endTime = changeTimeStyle(term_endTime);
      //console.log(this.term_endTime);
    },
    //获取用户信息
    getUser() {
      this.user = this.$store.state.user;
      this.userId = this.user.id;
    },
    //获取已有的可签到地址 - 结果为数组，元素为对象｛location，field｝
    getLocation() {
      //执行该函数前必须先获取userid
      if (this.user.accessfield === "0") {
        http.getAllLocation().then((res) => {
          if (res.code === 20000) {
            //console.log(res.data.locationToFieldList);
            this.locationList = res.data.locationToFieldList;
          }
        });
      } else {
        http.getLocation(this.userId).then((res) => {
          if (res.code === 20000) {
            //console.log(res.data.shopperList);
            this.locationList = res.data.shopperList;
          }
        });
      }
    },
    /* -------------------------------------------------------------------------------------------- */
    //参数准备
    createParams() {
      //console.log(typeof this.atdTime_s);

      //获取location和field - 将多选的location进行字符连接
      let location = "";
      let field = "";
      this.form.location.forEach((value) => {
        location = location + "," + value.location;
        field = field + "," + value.field;
      });
      //若请求成功，则切片去掉开头的","
      if (location.length > 0) {
        location = location.slice(1); //字符串 location以逗号相隔
        field = field.slice(1); // 字符串 逗号相隔
      }
      //console.log(location, field);

      //获取起始周与结束周
      //atdWeeks [15,50]
      let startWeek = this.atdWeeks[0] / 5;
      let endWeek = this.atdWeeks[1] / 5;
      //console.log(startWeeks);

      //获取参数 => begin,end,weeknum => getweek(begin,end,weeknum)
      let begin = this.term_beginTime;
      let end = this.term_endTime;
      let weeknum = parseInt(this.ClassTime_day);
      //console.log(begin, end, weeknum);
      //获得课程时间段内周几(ClassTime_day)的具体时间
      let weekNumDay_list = this.getWeek(begin, end, weeknum);
      //console.log(weekNumDay_list);

      //根据课程周期startWeek endWeek截取起始时间
      let classTimeDay_list = weekNumDay_list.slice(startWeek - 1, endWeek);
      //console.log(classTimeDay_list);

      //获取当天签到起始时间与结束时间
      this.form.s_time = this.atdTime_s[1];
      this.form.e_time = this.atdTime_e;
      //console.log(this.form.s_time);

      //整合参数列表
      let paramsList = [];
      classTimeDay_list.forEach((value) => {
        let params = {
          name: this.form.name,
          field: field,
          location: location,
          s_time: value + " " + this.form.s_time,
          e_time: value + " " + this.form.e_time,
          RESERVE: 1, //聊天室类别标识符。1为考勤专用
          creator: this.userId,
        };
        paramsList.push(params);
      });
      //console.log(paramsList);

      return paramsList;
    },
    /* -------------------------------------------------------------------------------------------- */
    /* 获取时间段内属于星期一(*)的日期们
     * begin: 开始时间 "2022-01-05"
     * end：结束时间
     * weekNum：星期几 {number} 0-6：周日-周一
     */
    getWeek(begin, end, weekNum) {
      var dateArr = new Array();
      var stimeArr = begin.split("-"); //=>["2018", "01", "01"]
      var etimeArr = end.split("-"); //=>["2018", "01", "30"]

      var stoday = new Date();
      stoday.setUTCFullYear(stimeArr[0], stimeArr[1] - 1, stimeArr[2]);
      var etoday = new Date();
      etoday.setUTCFullYear(etimeArr[0], etimeArr[1] - 1, etimeArr[2]);

      var unixDb = stoday.getTime(); //开始时间的毫秒数
      var unixDe = etoday.getTime(); //结束时间的毫秒数

      for (var k = unixDb; k <= unixDe; ) {
        let needJudgeDate = this.msToDate(parseInt(k)).withoutTime;
        //不加这个if判断直接push的话就是已知时间段内的所有日期
        if (new Date(needJudgeDate).getDay() === weekNum) {
          dateArr.push(needJudgeDate);
        }
        k = k + 24 * 60 * 60 * 1000;
      }
      return dateArr;
    },
    //根据毫秒数获取日期
    msToDate(msec) {
      let datetime = new Date(msec);
      let year = datetime.getFullYear();
      let month = datetime.getMonth();
      let date = datetime.getDate();
      let hour = datetime.getHours();
      let minute = datetime.getMinutes();
      let second = datetime.getSeconds();

      let result1 =
        year +
        "-" +
        (month + 1 >= 10 ? month + 1 : "0" + (month + 1)) +
        "-" +
        (date + 1 < 10 ? "0" + date : date) +
        " " +
        (hour + 1 < 10 ? "0" + hour : hour) +
        ":" +
        (minute + 1 < 10 ? "0" + minute : minute) +
        ":" +
        (second + 1 < 10 ? "0" + second : second);

      let result2 =
        year +
        "-" +
        (month + 1 >= 10 ? month + 1 : "0" + (month + 1)) +
        "-" +
        (date + 1 < 11 ? "0" + date : date);

      let result = {
        hasTime: result1,
        withoutTime: result2,
      };

      return result;
    },
    /* -------------------------------------------------------------------------------------------- */
    onSubmit() {
      //表单数据未填完则按钮点击无效
      if (
        !this.form.name ||
        !this.form.location.length ||
        !this.atdTime_s.length ||
        !this.atdTime_e.length
      ) {
        this.$message.warning("考勤信息未填完");
      } else {
        //获取参数
        let paramsList = this.createParams();
        //请求创建考勤聊天室
        //paramsList = JSON.stringify(paramsList);
        console.log(paramsList);
        http
          .addClassRooms(paramsList)
          .then((res) => {
            if (res.code === 20000) {
              this.$message.success("提交成功！");
              this.onReset();
            } else {
              this.$message.error("提交失败！");
            }
          })
          .catch(() => {
            this.$message.error("提交失败！");
          });
      }
    },

    onReset() {},
  },
};
</script>
