import axios from 'axios';

const MyAxios = {};
MyAxios.install = function(Vue) {
  const instance = axios.create({
    baseURL: 'http://192.168.1.240:8000/api/'
  });
  Vue.prototype.$http = instance;
};

export default MyAxios;
