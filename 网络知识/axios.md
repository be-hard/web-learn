### axios

可用于 web 和 node 端，在 web 端，是基于 XMLHttpRequest 和 promise 实现的接口请求

- promise 化
- 可以拦截请求和响应
- 自动转换 JSON 数据
- 防护 XSRF 攻击
- 可以设置超时时间
返回的都是promise。
axios(config)
axios({
method: 'post',
url: '/user/12345',
data: {
firstName: 'Fred',
lastName: 'Flintstone'
}
});

常用的请求方式别名
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
<!-- 注意：第二个参数是data,是要作为body里的数据内容 -->
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])

#### 创建实例

const instance = axios.create({
baseURL: 'https://some-domain.com/api/',
timeout: 1000,
headers: {'X-Custom-Header': 'foobar'}
});

#### config
https://axios-http.com/docs/req_config

{
url:'',
method:'',
baseUrl:'',
headers: {'X-Requested-With': 'XMLHttpRequest'},
// `params` are the URL parameters to be sent with the request
// Must be a plain object or a URLSearchParams object
// NOTE: params that are null or undefined are not rendered in the URL.
params: {
ID: 12345
},
paramsSerializer: function (params) {
return Qs.stringify(params, {arrayFormat: 'brackets'})
},
// `data` is the data to be sent as the request body
// Only applicable for request methods 'PUT', 'POST', 'DELETE', and 'PATCH'
// When no `transformRequest` is set, must be of one of the following types:
// - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
// - Browser only: FormData, File, Blob
// - Node only: Stream, Buffer
data: {
firstName: 'Fred'
},
timeout: 1000, // default is `0` (no timeout)
withCredentials: false, // default
responseType: 'json', // default
responseEncoding: 'utf8', // default
xsrfCookieName: 'XSRF-TOKEN', // default
onUploadProgress: function (progressEvent) {
// Do whatever you want with the native progress event
},
 // `maxContentLength` defines the max size of the http response content in bytes allowed in node.js
  maxContentLength: 2000,

  // `maxBodyLength` (Node only option) defines the max size of the http request content in bytes allowed
  maxBodyLength: 2000,
   httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
  proxy: {
    protocol: 'https',
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

}

- 设置超时时间
  instance.defaults.timeout = 2500;
  instance.get('/longRequest', {
  timeout: 5000
  });

#### Interceptor 拦截器

- 请求拦截器
  在请求发出前做一些事情，要记得返回，否则就是拦截请求请求不会发出去

```
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
```
序列化qs
QS.stringify(params)
