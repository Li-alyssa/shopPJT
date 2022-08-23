//引入路由组件
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';


//路由配置信息
export default [
    //重定向
    {
        path: "*",
        redirect: "/home",
    },
    {
        path: '/home',
        component: Home,
        //路由元信息
        meta: { show: true }

    },
    {
        path: '/search/:keyword?',
        component: Search,
        meta: { show: true },
        name: "search",
        //路由组件能否传递props数据？
        ///布尔值写法：只能传递params
        // props: true
        //对象写法：额外的给路由组件传递一些props
        // props: { a: 1, b: 2 }
        //函数写法：可以将params参数与query参数，通过props传递给路由组件
        props: ($route) => {
            return {
                keyword: $route.params.keyword, k: $route.query.k
            }
        }
    },
    {
        path: '/detail/:skuid',
        component: Detail,
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        component: AddCartSuccess,
        name: "addcartsuccess",
        meta: { show: true }
    }, {
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true }
    }, {
        path: '/trade',
        component: Trade,
        meta: { show: true }
    },
    {
        path: '/login',
        component: Login,
        meta: { show: false }
    },
    {
        path: '/register',
        component: Register,
        meta: { show: false }
    },

]