<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 聊天室管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>添加聊天室</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="聊天室名称">
            <el-input
              v-model="form.name"
              placeholder="请输入聊天室名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="聊天室区域" prop="location">
            <el-select
              v-model="form.location"
              value-key="field"
              multiple
              placeholder="请选择聊天室区域"
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
          <!--                    <el-form-item label="聊天室位置">-->
          <!--                        <el-input v-model="form.location" placeholder="请输入聊天室位置"></el-input>-->
          <!--                    </el-form-item>-->
          <!--                    <el-form-item label="取号功能">-->
          <!--                        <el-select v-model="form.number" placeholder="选择取号功能">-->
          <!--                            <el-option key="1" label="按桌型叫号" value="按桌型叫号"></el-option>-->
          <!--                            <el-option key="2" label="标准" value="标准"></el-option>-->
          <!--                            <el-option key="3" label="否" value="否"></el-option>-->
          <!--                        </el-select>-->
          <!--                    </el-form-item>-->

          <el-form-item label="选择开始时间">
            <el-date-picker
              v-model="form.s_time"
              type="datetime"
              placeholder="选择开始时间"
              style="width: 100%"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="选择截至时间">
            <el-date-picker
              v-model="form.e_time"
              type="datetime"
              placeholder="选择结束时间"
              style="width: 100%"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button style="margin-left: 300px" @click="onReset"
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
  name: "addChatRoom",
  data() {
    return {
      form: {
        name: "",
        s_time: "",
        e_time: "",
        location: [],
        RESERVE: 0,
      },
      locationList: [
        {
          location: "华堂",
          field: "1",
        },
        {
          location: "合生汇",
          field: "2",
        },
        {
          location: "中蓝",
          field: "3",
        },
      ],
    };
  },
  created() {
    this.locationList = [];
    this.getLocation();
  },
  methods: {
    getLocation() {
      let user = this.$store.state.user;
      let userId = user.id;
      if (user.accessfield === "0") {
        http.getAllLocation().then((res) => {
          if (res.code === 20000) {
            console.log(res.data.locationToFieldList);
            this.locationList = res.data.locationToFieldList;
          }
        });
      } else {
        http.getLocation(userId).then((res) => {
          if (res.code === 20000) {
            console.log(res.data.shopperList);
            this.locationList = res.data.shopperList;
          }
        });
      }
    },
    onSubmit() {
      let user = this.$store.state.user;
      let userId = user.id;
      let location = "";
      let field = "";
      let locations = this.form.location;
      locations.forEach(myFunction);
      function myFunction(value, index, array) {
        location = location + "," + value.location;
        field = field + "," + value.field;
      }

      if (field.length > 0) {
        location = location.slice(1); //去除开头的引号
        field = field.slice(1);
      }
      console.log(field);
      console.log(location);
      let params = {
        name: this.form.name,
        field: field,
        location: location,
        s_time: this.changeTimeStyle(this.form.s_time),
        e_time: this.changeTimeStyle(this.form.e_time),
        RESERVE: 0,
        creator: userId,
      };
      console.log(params);
      http.addChatRoom(params).then((res) => {
        if (res.code === 20000) {
          this.$message.success("提交成功！");
          this.onReset();
        } else {
          this.$message.error("提交失败！");
        }
      });
      // console.log(this.form.location)
    },
    onReset() {
      this.form = [];
      console.log(this.form);
    },
    changeTimeStyle(oldTime) {
      // 时间转换
      let datejson = new Date(oldTime).toJSON();
      let date = new Date(+new Date(datejson) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
      return date;
    },
  },
};
</script>
