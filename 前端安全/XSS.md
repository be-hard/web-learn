## XSS跨站脚本攻击
XSS (Cross Site Scripting)，为了与“CSS”区分开来，故简称 XSS。
XSS 攻击是指黑客往 HTML 文件中或者 DOM 中注入恶意脚本，从而在用户浏览页面时利用注入的恶意脚本对用户实施攻击的一种手段。

> 为什么叫跨站脚本攻击？
最开始的时候，这种攻击是通过跨域来实现的，所以叫“跨域脚本”。但是发展到现在，往 HTML 文件中注入恶意代码的方式越来越多了，所以是否跨域注入脚本已经不是唯一的注入手段了，但是 XSS 这个名字却一直保留至今。

### 如果页面被注入了恶意 JavaScript 脚本，恶意脚本都能做哪些事情
#### 可以窃取 Cookie 信息
通过“document.cookie”获取 Cookie 信息，然后通过 XMLHttpRequest 或者 Fetch 加上 CORS 功能将数据发送给恶意服务器；恶意服务器拿到用户的 Cookie 信息之后，就可以在其他电脑上模拟用户的登录，然后进行转账等操作
#### 可以监听用户行为
恶意 JavaScript 可以使用“addEventListener”接口来监听键盘事件，比如可以获取用户输入的信用卡等信息，将其发送到恶意服务器。
#### 可以在页面内生成浮窗广告，这些广告会严重地影响用户体验
#### 可以通过修改 DOM 伪造假的登录窗口，用来欺骗用户输入用户名和密码等信息

### 恶意脚本如何注入的
XSS分为三种，存储型、反射型、基于DOM
#### 1. 存储型XSS攻击

首先黑客利用站点漏洞（比如服务器对关键字的过滤不严格）将一段恶意 JavaScript 代码提交到网站的数据库中；      
然后用户向网站请求包含了恶意 JavaScript 脚本的页面；     
当用户浏览该页面的时候，恶意脚本就会执行，将用户的 Cookie 信息等数据上传到恶意服务器。

#### 2. 反射型 XSS 攻击
恶意 JavaScript 脚本属于用户发送给网站请求中的一部分，随后网站又把恶意 JavaScript 脚本返回给用户。当恶意 JavaScript 脚本在用户页面中被执行时，黑客就可以利用该脚本做一些恶意操作。

Web 服务器不会存储反射型 XSS 攻击的恶意脚本，这是和存储型 XSS 攻击不同的地方。

#### 3. 基于 DOM 的 XSS 攻击
在 Web 资源传输过程或者在用户使用页面的过程中修改 Web 页面的数据。
黑客通过各种手段将恶意脚本注入用户的页面中，比如通过网络劫持在页面传输过程中修改 HTML 页面的内容，这种劫持类型很多，有通过 WiFi 路由器劫持的，有通过本地恶意软件来劫持的。

### 如何防御XSS攻击
- 1. 服务器对输入脚本进行过滤或转码
- 2. 充分利用 CSP
https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP
限制加载其他域下的资源文件，这样即使黑客插入了一个 JavaScript 文件，这个 JavaScript 文件也是无法被加载的；禁止向第三方域提交数据，这样用户数据也不会外泄；禁止执行内联脚本和未授权的脚本；还提供了上报机制，这样可以帮助我们尽快发现有哪些 XSS 攻击，以便尽快修复问题。
实现：
- 配置你的网络服务器返回  Content-Security-Policy  HTTP头部 
- <meta>  元素也可以被用来配置该策略
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*; child-src 'none';">

- 3. 使用 HttpOnly 属性
服务器可以将某些 Cookie 设置为 HttpOnly 标志，HttpOnly 是服务器通过 HTTP 响应头来设置的，
使用 HttpOnly 标记的 Cookie 只能使用在 HTTP 请求过程中，所以无法通过 JavaScript 来读取这段 Cookie
- 当然除了以上策略之外，我们还可以通过添加验证码防止脚本冒充用户提交危险操作。而对于一些不受信任的输入，还可以限制其输入长度，这样可以增大 XSS 攻击的难度。

