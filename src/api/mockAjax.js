//对于axios进行二次封装
import axios from 'axios';
//引入进度条
import nprogress from 'nprogress';
//start 进度条开始
//done进度条结束
//引入进度条样式
import "nprogress/nprogress.css"

//利用axios对象的方法create 创建一个axios实例
//request就是axios 可以进行简单配置
const requests = axios.create({
    //配置对象
    //基础路径，发请求时，路径中出现api
    baseURL: "/mock",
    //代表请求超时5s
    timeout: 5000,
});

//请求拦截器：在请求之前，请求拦截器可以检测到，在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
    //config:配置对象，对象中属性：headers请求头很重要
    //进度条开始
    nprogress.start();
    return config;
})

//响应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调函数：服务器响应数据回来后，响应拦截器可以检测到，做一些事情
    //进度条结束
    nprogress.done();
    return res.data;
}, (error) => {
    //响应失败的回调函数
    return Promise.reject(new Error('faile'))
})

//对外暴露
export default requests;