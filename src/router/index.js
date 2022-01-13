import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          title: "系统首页",
        },
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */
            "../views/Dashboard.vue"
          ),
      },
      {
        path: "/attendance",
        name: "attendance",
        meta: {
          title: "增加考勤",
        },
        component: () => import("../views/Attendance/attendance.vue"),
      },
      {
        path: "/checkAttendance",
        name: "checkAttendance",
        meta: {
          title: "查看考勤",
        },
        component: () => import("../views/Attendance/checkAttendance.vue"),
      },
      {
        path: "/addChatRoom",
        name: "addChatRoom",
        meta: {
          title: "增加聊天室",
        },
        component: () => import("../views/chatroom/AddChatRoom.vue"),
      },
      {
        path: "/deleteChatRoom",
        name: "deleteChatRoom",
        meta: {
          title: "管理聊天室",
        },
        component: () => import("../views/chatroom/DeleteChatRoom.vue"),
      },
      {
        path: "/chatRoomInfo",
        name: "chatRoomInfo",
        meta: {
          title: "聊天室详情页",
        },
        component: () => import("../views/chatroom/info/ChatRoomInfo.vue"),
      },
      {
        path: "/editChatRoom",
        name: "editChatRoom",
        meta: {
          title: "编辑聊天室",
        },
        component: () => import("../views/chatroom/EditChatRoom.vue"),
      },
      {
        path: "/table",
        name: "basetable",
        meta: {
          title: "表格",
        },
        component: () =>
          import(
            /* webpackChunkName: "table" */
            "../views/BaseTable.vue"
          ),
      },
      {
        path: "/charts",
        name: "basecharts",
        meta: {
          title: "图表",
        },
        component: () =>
          import(
            /* webpackChunkName: "charts" */
            "../views/BaseCharts.vue"
          ),
      },
      {
        path: "/form",
        name: "baseform",
        meta: {
          title: "表单",
        },
        component: () =>
          import(
            /* webpackChunkName: "form" */
            "../views/BaseForm.vue"
          ),
      },
      {
        path: "/tabs",
        name: "tabs",
        meta: {
          title: "tab标签",
        },
        component: () =>
          import(
            /* webpackChunkName: "tabs" */
            "../views/Tabs.vue"
          ),
      },
      {
        path: "/donate",
        name: "donate",
        meta: {
          title: "鼓励作者",
        },
        component: () =>
          import(
            /* webpackChunkName: "donate" */
            "../views/Donate.vue"
          ),
      },
      {
        path: "/permission",
        name: "permission",
        meta: {
          title: "权限管理",
          permission: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "permission" */
            "../views/Permission.vue"
          ),
      },
      {
        path: "/i18n",
        name: "i18n",
        meta: {
          title: "国际化语言",
        },
        component: () =>
          import(
            /* webpackChunkName: "i18n" */
            "../views/I18n.vue"
          ),
      },
      {
        path: "/upload",
        name: "upload",
        meta: {
          title: "上传插件",
        },
        component: () =>
          import(
            /* webpackChunkName: "upload" */
            "../views/Upload.vue"
          ),
      },
      {
        path: "/icon",
        name: "icon",
        meta: {
          title: "自定义图标",
        },
        component: () =>
          import(
            /* webpackChunkName: "icon" */
            "../views/Icon.vue"
          ),
      },
      {
        path: "/404",
        name: "404",
        meta: {
          title: "找不到页面",
        },
        component: () =>
          import(
            /* webpackChunkName: "404" */
            "../views/404.vue"
          ),
      },
      {
        path: "/403",
        name: "403",
        meta: {
          title: "没有权限",
        },
        component: () =>
          import(
            /* webpackChunkName: "403" */
            "../views/403.vue"
          ),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
    },
    component: () =>
      import(
        /* webpackChunkName: "login" */
        "../views/Login.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | vue-manage-system`;
  const user = localStorage.getItem("user");

  if (!user && to.path !== "/login") {
    next("/login");
  } else if (to.meta.permission) {
    const role = JSON.parse(user).accessfield;
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === "0" ? next() : next("/403");
  } else {
    next();
  }
});

export default router;
