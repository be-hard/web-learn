### OAuth
OAuth 2.0 是目前最流行的授权机制，用来授权第三方应用，获取用户数据。
简单说，OAuth 就是一种授权机制。数据的所有者告诉系统，同意授权第三方应用进入系统，获取这些数据。系统从而产生一个短期的进入令牌（token），用来代替密码，供第三方应用使用。

#### 令牌与密码
（1）令牌是短期的，到期会自动失效，用户自己无法修改。密码一般长期有效，用户不修改，就不会发生变化。

（2）令牌可以被数据所有者撤销，会立即失效。以上例而言，屋主可以随时取消快递员的令牌。密码一般不允许被他人撤销。

（3）令牌有权限范围（scope），比如只能进小区的二号门。对于网络服务来说，只读令牌就比读写令牌更安全。密码一般是完整权限。
### 令牌颁发的四种形式
不管哪一种授权方式，第三方应用申请令牌之前，都必须先到系统备案，说明自己的身份，然后会拿到两个身份识别码：客户端 ID（client ID）和客户端密钥（client secret）。这是为了防止令牌被滥用，没有备案过的第三方应用，是不会拿到令牌的。
#### 1. 授权码
授权码（authorization code）方式，指的是第三方应用先申请一个授权码，然后再用该码获取令牌
这种方式是最常用的流程，安全性也最高，它适用于那些有后端的 Web 应用。**授权码通过前端传送，令牌则是储存在后端，而且所有与资源服务器的通信都在后端完成**。这样的前后端分离，可以避免令牌泄漏。

#### 过程
- 第一步，A 网站提供一个链接，用户点击后就会跳转到 B 网站（比如微信），授权用户数据给 A 网站使用。下面就是 A 网站跳转 B 网站的一个示意链接。
```

https://b.com/oauth/authorize?
  response_type=code&
  client_id=CLIENT_ID&
  redirect_uri=CALLBACK_URL&
  scope=read

上面 URL 中，response_type参数表示要求返回授权码（code），client_id参数让 B 知道是谁在请求，redirect_uri参数是 B 接受或拒绝请求后的跳转网址，scope参数表示要求的授权范围（这里是只读）

```
- 第二步，用户跳转后，B 网站会要求用户登录，然后询问是否同意给予 A 网站授权。用户表示同意，这时 B 网站就会跳回redirect_uri参数指定的网址。跳转时，会传回一个授权码，就像下面这样。
```
https://a.com/callback?code=AUTHORIZATION_CODE
上面 URL 中，code参数就是授权码。
```
- 第三步，A 网站拿到授权码以后，就可以在后端，向 B 网站请求令牌。
```
https://b.com/oauth/token?
 client_id=CLIENT_ID&
 client_secret=CLIENT_SECRET&
 grant_type=authorization_code&
 code=AUTHORIZATION_CODE&
 redirect_uri=CALLBACK_URL
```
- 第四步，B 网站收到请求以后，就会颁发令牌。具体做法是向redirect_uri指定的网址，发送一段 JSON 数据。

![](https://www.wangbase.com/blogimg/asset/201904/bg2019040905.jpg)

### 2.隐藏式
有些 Web 应用是纯前端应用，没有后端。允许直接向前端颁发令牌。这种方式没有授权码这个中间步骤。
这种方式把令牌直接传给前端，是很不安全的。因此，只能用于一些安全要求不高的场景，并且令牌的有效期必须非常短，通常就是会话期间（session）有效，浏览器关掉，令牌就失效了。

- 第一步，A 网站提供一个链接，要求用户跳转到 B 网站，授权用户数据给 A 网站使用。
```
https://b.com/oauth/authorize?
  response_type=token&
  client_id=CLIENT_ID&
  redirect_uri=CALLBACK_URL&
  scope=read
  上面 URL 中，response_type参数为token，表示要求直接返回令牌。
```
- 第二步，用户跳转到 B 网站，登录后同意给予 A 网站授权。这时，B 网站就会跳回redirect_uri参数指定的跳转网址，并且把令牌作为 URL 参数，传给 A 网站
```
https://a.com/callback#token=ACCESS_TOKEN
```
### 3.密码式
- 第一步，A 网站要求用户提供 B 网站的用户名和密码。拿到以后，A 就直接向 B 请求令牌。
- 第二步，B 网站验证身份通过后，直接给出令牌。注意，这时不需要跳转，而是把令牌放在 JSON 数据里面，作为 HTTP 回应，A 因此拿到令牌。
### 4.凭证式
适用于没有前端的命令行应用，即在命令行下请求令牌。
- 第一步，A 应用在命令行向 B 发出请求。
- 第二步，B 网站验证通过以后，直接返回令牌。


