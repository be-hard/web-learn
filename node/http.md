const http = require('http')

response.writeHead(200,{

})
response.statusCode = 200;
response.setHeader('content-type','text/plain')
response.end()
读取文件出来是会占用内存的，如果文件比较大，服务器的内存消耗太大，性能差。采用流的形式。
const rs = fs.createReadStream('./1.png);
const ws = fs.createWriteStream('./2.png')
rs.pipe(ws)