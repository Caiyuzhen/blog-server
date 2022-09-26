/*server 的回调函数, 此处主要写的是服务器的【设置逻辑】, 解析一些【路由参数】*/
const handleBlogRoute = require('./src/routes/blog.js')
const queryString = require('querystring')



// 📮 处理 POST 数据的方法，单独写, 然后再传入下面的【服务器业务逻辑】 
const getPostData = (req) => {//接收请求的对象 req
	const promise = new Promise((resolve, reject) => {
		if(req.method !== 'POST'){
			resolve({})//不是 POST 则返回空对象
			return
		}
		if(req.headers['content-type'] !== 'application/json') {//如果不是此格式
			resolve({})
			return
		}else{

		let postData = ''//会传到👇下面 serverHandler 的方法中
		req.on('data',(chunk)=>{//流式的接收数据
			postData += chunk.toString()
		})

		req.on('end',()=>{
			if(!postData){//如果没有值
				resolve({})
				return
			}
			resolve(
				JSON.parse(postData)//把 postData 字符串数据转为【对象】
			)
		})
		}
	})

	return promise//最终 return 出来的是 【postData】
}






//🚚 核心的【服务器 url 业务逻辑】 ————————————————————————————————————————————————
const serverHandler = (req, res) => {
	//设置响应格式
	res.setHeader('Content-Type', 'application/json')

	/*🔥🔥🔥获取 path: 并且把 path 设置到 req上，所以 blog 方法就能通过 req 来获取 path！这样在要获取用户路由时就不用再重复去解析 url 了*/
	const url = req.url
	req.path = url.split('?')[0]  

	/*🔥🔥🔥解析 query(比如 api/blog/list?author=jimmy)*/
	req.query = queryString.parse(url.split('?')[1])


	//⚡️⚡️在生成路由之前，先处理 POST 数据,传递 req 这个请求对象, 因为这是个异步函数，所以会先走下面的路由,所以要把路由包裹进去
	getPostData(req).then((postData)=>{
		//让处理路由之前，能够用上 postData 数据
		req.body === postData
	

		/*🔥🔥🔥👇博客的相关路由: 下面都是博客相关的路由逻辑，传入 req、res 参数，然后会返回一个结果, 用 blogDat 来接收, 本质上【执行了 blog.js】 , 数据返回后会保存在 blogData 内*/
		const blogDataPromise = handleBlogRoute(req, res)


		//⚡️⚡️⚡️最终返回的路由出口！
		if(blogDataPromise) { //如果 blogDn.js 返回了 Promise
			blogDataPromise.then((blogData) => {
				res.end(JSON.stringify(blogData)) //把数据反回给【客户端】, 二进制转为字符串
			})
			return
		}


		//如果未命中完整的 api 路由，则返回 404
		res.writeHead(404, {'Content-Type': 'text/plain'})//把返回的数据设置成纯文本类型
		res.write('404 Not Found')
		res.end()//终止响应
	})
}






module.exports = serverHandler