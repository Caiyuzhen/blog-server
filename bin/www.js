/* 整个项目启动时会执行的根文件
	  主要放的是服务器的基础配置代码
*/
const http = require('http')

const PORT = 5050 //创建端口号


const serverHandler = require('../app.js')

const server = http.createServer(serverHandler)

server.listen(PORT, ()=>{
	console.log('server running at port 5050')
})