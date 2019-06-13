//设置vuex仓库

import Vuex from "vuex";
import Vue from "vue";

//注册插件
Vue.use(Vuex);

//创建Vuex实例
const store = new Vuex.Store({
  //仓库数据
  state: {
    //当其他页面访问user数据的时候，直接传入浏览器本地的数据
    user: JSON.parse(localStorage.getItem("user")) || {}
  },
  //设置仓库数据的方法
  mutations: {
    //设置仓库数据
    setUser(state, data) {
      state.user = data;
      //因为这个方法是在登录页面的时候调用的，所以如果重新刷新页面的时候就会重新加载js，所以数据就会丢失,为了防止数据的丢失，将数据缓存在浏览器本地当中,但是localStorage.setItem只能存储字符串数据
      localStorage.setItem("user", JSON.stringify(data));
    }
  }
});

//暴露仓库
export default store;
