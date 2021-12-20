### DNS
DNS是让网络中的成千上万的网址域名和IP地址能够一一对应并且进行查找和管理的一套机制
主要靠的是专门的DNS服务器们
### DNS服务器们如何协作来实现高效的DNS查询
DNS服务器们有个分层协作的机制，这个机制和域名层级有很大的关系。 
- 域名层级
www.blibili.com（.root）
二级域名 一级域名 顶级域名 根域名(唯一的，一般会省略)
每台联网的设备都会有指定的DNS服务器来完成查询IP地址的过程
先从 根服务器查询(Root DNS Server),只有各个顶级域名如com、cn的DNS服务器的IP地址信息，返回顶级域名的IP信息
- 接着DNS服务器找负责com顶级域名的DNS服务器(Top Level DNS Server)，负责com顶级域名的DNS服务器收到请求后查询到专门负责blibili.com的DNS服务器的IP地址信息后，返回给DNS服务器
- 接着DNS服务器找专门负责blibili.com的DNS服务器(Name DNS Server)。该服务器收到请求后，查询www.blibili.com的DNS服务器的IP地址信息后，返回给DNS服务器

DNS服务器是记录每个网址对应的服务器IP地址 
- 域名
- 服务器
- DNS解析
- 备案

1 查找DNS缓存
 