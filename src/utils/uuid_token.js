import { v4 as uuidv4 } from 'uuid';
//生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {
    //先从本地存储获取uuid，检查本地存储里是否有
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    //如果没有则生成一个临时身份
    if (!uuid_token) {
        uuid_token = uuidv4();
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    return uuid_token
}