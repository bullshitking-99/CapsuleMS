import { createStore } from "vuex";

export default createStore({
  state: {
    //旧版所用数据，避免bug不对其进行封装
    tagsList: [],
    collapse: false,
    user: JSON.parse(window.localStorage.getItem("user" || [])),

    //createRoom页面中选中学校后存储的学校专属信息，将被attendance页面获取
    school: {
      schoolName: "",
      termBeginTime: "",
      weekNum: "",
    },
  },

  //获取数据 - 修饰读，可以简化读取时的变量符(mapGetter)并在读取时修改原值内容(有些页面需要原值，有些需要修饰后的数据)
  getters: {
    getSchool(state) {
      // 第一个参数state为必要参数，必须写在形参上
      return state.school;
    },
  },

  //同步更改数据 - mutations，不能直接使用变量赋值的方式修改
  // 若增加带参数的mutations方法，官方建议payload为一个对象
  // 注意，mapMutations是解构到methods里面的，而不是计算属性了
  mutations: {
    setSchool(state, payload) {
      state.school.schoolName = payload.schoolName;
      state.school.termBeginTime = payload.termBeginTime;
      state.school.weekNum = payload.weekNum;
    },

    //旧版本方法
    delTagsItem(state, data) {
      state.tagsList.splice(data.index, 1);
    },
    setTagsItem(state, data) {
      state.tagsList.push(data);
    },
    clearTags(state) {
      state.tagsList = [];
    },
    closeTagsOther(state, data) {
      state.tagsList = data;
    },
    closeCurrentTag(state, data) {
      for (let i = 0, len = state.tagsList.length; i < len; i++) {
        const item = state.tagsList[i];
        if (item.path === data.$route.fullPath) {
          if (i < len - 1) {
            data.$router.push(state.tagsList[i + 1].path);
          } else if (i > 0) {
            data.$router.push(state.tagsList[i - 1].path);
          } else {
            data.$router.push("/");
          }
          state.tagsList.splice(i, 1);
          break;
        }
      }
    },
    // 侧边栏折叠
    hadndleCollapse(state, data) {
      state.collapse = data;
    },
  },
  actions: {},
  modules: {},
});
