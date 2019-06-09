import Vue from "vue";
import App from "./App.vue";
import axios from "axios"

// 1.引入element-ui
import ElementUI from "element-ui";

// 2.引入组件
import "element-ui/lib/theme-chalk/index.css";
import Admin from "./pages/Admin.vue";
import Login from "./pages/Login.vue";
import CategoryList from "./pages/CategoryList.vue";
import GoodList from "./pages/GoodList.vue";

//引入路由
import VueRouter from "vue-router"

// 3.全局注册组件
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Login);

//配置路由
const routes=[
  {path:"/login",component:Login,meta:"登录"},
  {path:"/",redirect:"/admin/goodlist"},
  {path:"/admin",component:Admin,meta:"后台管理",children:[
    {path:"goodlist",component:GoodList,meta:"商品列表"},
    {path:"categorylist",component:CategoryList,meta:"栏目管理"}
  ]}
]

//创建路由实例
const router=new VueRouter({
  routes
})

Vue.config.productionTip = false;

//因为axios每次引用都要导入很麻烦，所以将这个绑定到实例原型上，方便调用
Vue.prototype.$axios=axios;

new Vue({
  render: h => h(App),
  //挂载路由
  router
}).$mount("#app");
