import axios from "axios";

export function request(config) {
  //创建axios实例
  const instance = axios.create({
    baseURL: "http://123.207.32.32:9001",
    timeout: 6000,
  });
  //请求拦截器
  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      console.log(error);
    }
  );
  //响应拦截器
  instance.interceptors.response.use(
    (res) => {
      return res.data;
    },
    (error) => {
      console.log(error);
    }
  );
  //发送真正的网络请求
  return instance(config);
}
