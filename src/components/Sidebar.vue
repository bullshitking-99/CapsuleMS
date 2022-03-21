<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template #title>{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                  >{{ threeItem.title }}</el-menu-item
                >
              </el-submenu>
              <el-menu-item
                v-else
                :index="subItem.index"
                :key="subItem.index"
                >{{ subItem.title }}</el-menu-item
              >
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
// import bus from "../common/bus";
export default {
  data() {
    return {
      items: [
        {
          icon: "el-icon-lx-home",
          index: "dashboard",
          title: "系统首页",
        },
        {
          icon: "el-icon-place",
          index: "-1",
          title: "时空聊天室",
          subs: [
            {
              index: "CreateRoom",
              title: "新建聊天室",
            },
            {
              index: "checkAttendance",
              title: "管理聊天室",
            },
          ],
        },
        {
          icon: "el-icon-s-order",
          index: "0",
          title: "课堂考勤",
          subs: [
            {
              index: "attendance",
              title: "增加考勤",
            },
            {
              index: "checkAttendance",
              title: "查看考勤",
            },
          ],
        },
        {
          icon: "el-icon-s-operation",
          index: "1",
          title: "聊天室管理(旧版)",
          subs: [
            {
              index: "addChatRoom",
              title: "增加聊天室",
            },
            {
              index: "deleteChatRoom",
              title: "管理聊天室",
            },
            // {
            //     index: "editChatRoom",
            //     title: "编辑聊天室"
            // }
          ],
        },
        {
          icon: "el-icon-menu",
          index: "", //classInfo
          title: "类别管理",
        },
        {
          icon: "el-icon-s-comment",
          index: "2",
          title: "评论管理",
          subs: [
            {
              index: "", //remarkReview
              title: "评论审核",
            },
            {
              index: "", //remarkManage
              title: "评论信息管理",
            },
          ],
        },
        {
          icon: "el-icon-user",
          index: "3",
          title: "个人信息管理",
          subs: [
            {
              index: "", // editUserInfo
              title: "修改个人信息",
            },
          ],
        },
        {
          icon: "el-icon-setting",
          index: "4",
          title: "系统管理",
          subs: [
            {
              index: "",
              title: "友情链接管理",
            },
            {
              index: "",
              title: "修改密码",
            },
            {
              index: "",
              title: "刷新系统缓存",
            },
            {
              index: "",
              title: "安全退出",
            },
          ],
        },

        // {
        //     icon: "el-icon-lx-cascades",
        //     index: "table",
        //     title: "基础表格"
        // },
        // {
        //     icon: "el-icon-lx-copy",
        //     index: "tabs",
        //     title: "tab选项卡"
        // },
        // {
        //     icon: "el-icon-lx-calendar",
        //     index: "3",
        //     title: "表单相关",
        //     subs: [
        //         {
        //             index: "form",
        //             title: "基本表单"
        //         },
        //         //         {
        //         //             index: "3-2",
        //         //             title: "三级菜单",
        //         //             subs: [
        //         //                 {
        //         //                     index: "editor",
        //         //                     title: "富文本编辑器"
        //         //                 },
        //         //                 {
        //         //                     index: "markdown",
        //         //                     title: "markdown编辑器"
        //         //                 }
        //         //             ]
        //         //         },
        //         {
        //             index: "upload",
        //             title: "文件上传"
        //         }
        //     ]
        // },
        // {
        //     icon: "el-icon-lx-emoji",
        //     index: "icon",
        //     title: "自定义图标"
        // },
        // {
        //     icon: "el-icon-pie-chart",
        //     index: "charts",
        //     title: "schart图表"
        // },
        // {
        //     icon: "el-icon-rank",
        //     index: "6",
        //     title: "拖拽组件",
        //     subs: [
        //         {
        //             index: "drag",
        //             title: "拖拽列表"
        //         },
        //         {
        //             index: "dialog",
        //             title: "拖拽弹框"
        //         }
        //     ]
        // },
        // {
        //     icon: "el-icon-lx-global",
        //     index: "i18n",
        //     title: "国际化功能"
        // },
        {
          icon: "el-icon-lx-warn",
          index: "7",
          title: "权限管理",
          subs: [
            {
              index: "permission",
              title: "权限测试",
            },
            {
              index: "404",
              title: "404页面",
            },
          ],
        },
        // {
        //     icon: "el-icon-lx-redpacket_fill",
        //     index: "/donate",
        //     title: "支持作者"
        // }
      ],
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    },
    collapse() {
      return this.$store.state.collapse;
    },
  },
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
