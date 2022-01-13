<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb>
        <el-breadcrumb-item>
          <i class="el-icon-s-order"></i> 增加考勤
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <!-- 课堂名称与课堂教室 共一个el-form -->
        <el-form label-width="150px">
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
        </el-form>

        <!-- 课堂日期 使用单选Radio按钮 -->
        <el-form label-width="150px">
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
        <el-form :inline="true" label-width="150px" style="width:800px">
          <el-form-item label="签到起始时间">
            <el-cascader
              v-model="atdTime_s"
              :options="options_s"
              :props="{ expandTrigger: 'hover' }"
              style="width:170px"
              @change="changeDisabled_end"
            ></el-cascader>
          </el-form-item>
          <el-form-item> 
            <el-form-item label="签到结束时间" label-width="100px">
              <el-cascader
                v-model="atdTime_e"
                :options="options_e"
                :props="{ expandTrigger: 'hover' }"
                style="width:170px"
              ></el-cascader>
            </el-form-item>
          </el-form-item>
        </el-form>

        <!-- 签到周期 使用slider滑块 进行区域选择-->
        <el-form label-width="150px">
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
        <el-form label-width="250px" style="margin-top: 50px">
          <el-form-item>
            <el-button type="primary" :style="inputStyle" @click="onSubmit"
              >提交</el-button
            >
            <el-button style="margin-left: 100px" @click="onReset"
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
              label: "第一节课",
            },
            {
              value: "14:20:00",
              label: "第二节课",
            },
            {
              value: "15:25:00",
              label: "第三节课",
            },
            {
              value: "16:15:00",
              label: "第四节课",
            },
          ],
        },
        {
          value: "3",
          label: "晚上",
          children: [
            {
              value: "18:00:00",
              label: "第一节课",
            },
            {
              value: "18:50:00",
              label: "第二节课",
            },
            {
              value: "19:55:00",
              label: "第三节课",
            },
            {
              value: "20:45:00",
              label: "第四节课",
            },
          ],
        },
      ],
      //级联选择器选项-签到结束时间
      atdTime_e: [],
      options_e: [
        {
          value: "1",
          label: "上午",
          disabled: false,
          children: [
            {
              value: "08:45:00",
              label: "第一节课",
              disabled: false,
            },
            {
              value: "09:35:00",
              label: "第二节课",
              disabled: false,
            },
            {
              value: "10:40:00",
              label: "第三节课",
              disabled: false,
            },
            {
              value: "11:30:00",
              label: "第四节课",
              disabled: false,
            },
          ],
        },
        {
          value: "2",
          label: "下午",
          disabled: false,
          children: [
            {
              value: "14:15:00",
              label: "第一节课",
              disabled: false,
            },
            {
              value: "15:05:00",
              label: "第二节课",
              disabled: false,
            },
            {
              value: "16:10:00",
              label: "第三节课",
              disabled: false,
            },
            {
              value: "17:00:00",
              label: "第四节课",
              disabled: false,
            },
          ],
        },
        {
          value: "3",
          label: "晚上",
          disabled: false,
          children: [
            {
              value: "18:45:00",
              label: "第一节课",
              disabled: false,
            },
            {
              value: "19:35:00",
              label: "第二节课",
              disabled: false,
            },
            {
              value: "20:40:00",
              label: "第三节课",
              disabled: false,
            },
            {
              value: "21:30:00",
              label: "第四节课",
              disabled: false,
            },
          ],
        },
      ],
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
    console.log(this.form.location.length);
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
    //动态实时修改签到结束时间选项的disabled
    changeDisabled_end() {
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

      //校历还分上学期下学期，要先获取当前时间进行判断
      let date_now = new Date();
      //获取当前月份
      let month_now = date_now.getMonth() + 1;
      //判断当前学期
      let term_now;
      month_now >= 2 && month_now <= 7
        ? (term_now = "second_half")
        : (term_now = "first_half");
      //console.log(term_now);
      //根据学期获得第1周起始时间
      let term_week_beginTime;
      term_now === "first_half"
        ? (term_week_beginTime = "08-30")
        : (term_week_beginTime = "02-21");
      //如果当前月份<2且为上半学期，则开始时间年份应为当前年份-1
      let atdYear;
      month_now < 2
        ? (atdYear = date_now.getFullYear() - 1)
        : (atdYear = date_now.getFullYear());
      //第19周的结束时间
      let term_week_endTime;
      term_now === "first_half"
        ? (term_week_endTime = "01-09")
        : (term_week_endTime = "07-17");

      //获取参数 => begin,end,weeknum => getweek(begin,end,weeknum)
      let begin = atdYear + "-" + term_week_beginTime;
      let end = date_now.getFullYear() + "-" + term_week_endTime;
      let weeknum = this.ClassTime_day.codePointAt() - "0".codePointAt();
      //console.log(begin, end, weeknum);
      //获得课程时间段内周几(ClassTime_day)的具体时间
      let weekNumDay_list = this.getWeek(begin, end, weeknum);
      //console.log(weekNumDay_list);

      //根据课程周期startWeek endWeek截取起始时间
      let classTimeDay_list = weekNumDay_list.slice(startWeek - 1, endWeek);
      //console.log(classTimeDay_list);

      //获取当天签到起始时间与结束时间
      this.form.s_time = this.atdTime_s[1];
      this.form.e_time = this.atdTime_e[1];
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
          .catch((res) => {
            this.$message.error("提交失败！");
          });
      }
    },

    onReset() {},
  },
};
</script>
