import Vue from "vue";
import App from "./App.vue";
import axios from "axios";

// 1.引入element-ui
import ElementUI from "element-ui";

// 2.引入组件
import "element-ui/lib/theme-chalk/index.css";
import Admin from "./pages/Admin.vue";
import Login from "./pages/Login.vue";
import CategoryList from "./pages/CategoryList.vue";
import GoodList from "./pages/GoodList.vue";
import GoodAdd from "./pages/GoodAdd.vue";
import GoodEdit from "./pages/GoodEdit.vue";
import store from "./store/index"

//引入路由
import VueRouter from "vue-router";

// 3.全局注册组件
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Login);

//配置路由
const routes = [
  { path: "/login", component: Login, meta: "登录" },
  { path: "/", redirect: "/admin/goodlist" },
  {
    path: "/admin",
    component: Admin,
    meta: "后台管理",
    children: [
      { path: "goodlist", component: GoodList, meta: "商品列表" },
      { path: "categorylist", component: CategoryList, meta: "栏目管理" },
      { path: "goodadd", component: GoodAdd, meta: "新增商品" },
      { path: "goodedit/:id", component: GoodEdit, meta: "编辑商品" }
    ]
  }
];

//创建路由实例
const router = new VueRouter({
  routes
});

//创建路由卫士来检测是否已登录
//to:调转的页面
//from:源页面
//next:指定需要跳转的url，默认调转to页面,但此方法必须,否则不会进行下一步
router.beforeEach((to, from, next) => {
  axios({
    url: "http://localhost:8899/admin/account/islogin",
    method: "get",
    //一定要传session跨域，否则后台拿不到数据，改变不了状态
    withCredentials: true
  }).then(res => {
    //访问登录页面
    if (to.path == "/login") {
      console.log(res);
      //已登录
      if (res.data.code == "logined") {
        next("/");
      } else {
       next();
      }
    }else{
      if (res.data.code == "logined") {
        next();
      } else {
        next("/login")
      }
    }
  });

  //console.log(to,from);
});

Vue.config.productionTip = false;

//因为axios每次引用都要导入很麻烦，所以将这个绑定到实例原型上，方便调用
Vue.prototype.$axios = axios;

new Vue({
  render: h => h(App),
  //挂载路由
  router,
  //挂载vuex
  store
}).$mount("#app");
