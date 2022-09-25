// ⚡️开发处理博客相关的路由 api
const { SuccessModel,ErrorModel } = require('../model/responseModel')
const { getBlogList, getBlogDetail, createNewBlog, updateBlog, deleteBlog } = require('../controllers/blogFn')



//⚡️⚡️定义路由相关的 api 逻辑, 获得请求的方式和路径
const handleBlogRoute = (req, res) => { //接收 app.js 传来的两个参数
	
	// 👇管理所有路由都要用到的参数
	const id = req.query.id
	const method = req.method
	const blogData = req.body

	//可以在这一步解析 url 跟 path，也可以在上游 app.js 来设置
	// const url = req.url
	// const path = url.split('?')[0]


	//👇定义各种接口
	/*🔥🔥🔥因为 app.js 已经把 path 设置到 req 上，所以 blog 方法就能通过 req 来获取 path！
			同理，因为 app.js 已经通过 query 解析除了路由的参数，所以能通过 req 获取到*/
	

	//博客列表路由
	if(method === 'GET' && req.path === '/api/blog/list'){
		//api/blog/list?author=jimmy&keyword=123
		const author = req.query.author || '' //拿到 author 参数, 没有则设置为空字符串
		const keyword = req.query.keyword || ''
		const listData = getBlogList(author, keyword)//传入上面拿到的 id 跟 keyword，并且保存数据的方法(定义在 controllers )

		return new SuccessModel(listData) //把【获得的数据】通过传入 【new Model 的方式】返回给【客户端】
		// return {
		// 	message: '博客列表路由的接口'
		// }
	}


	// 博客详情路由
	if(method === 'GET' && req.path === '/api/blog/detail'){
		// const id = req.query.id || ''//拿到博客 id，传入函数
		const detailData = getBlogDetail(id)
		console.log(id)

		return new SuccessModel(detailData)
		// return {
		// 	message: '博客详情的接口'
		// }
	}


	//新增博客路由
	if(method === 'POST' && req.path === '/api/blog/new'){
		// const blogData = req.body
		const newBlogData = createNewBlog(blogData)
		// console.log(blogData)

		return new SuccessModel(newBlogData)
		// return {
		// 	message: '新建博客的接口'
		// }
	}


	//更新博客路由
	if(method === 'POST' && req.path === '/api/blog/update'){
		// const blogData = req.body
		const updateBlogData = updateBlog(id, blogData) //updateBlogData 是结果，为 true 或 false
		if(updateBlogData){
			// console.log(updateBlogData)
			return new SuccessModel('更新博客成功')
		} else {
			return new ErrorModel('更新博客失败...')
		}

		// console.log(req.body)
		
		// return {
		// 	message: '更新博客的接口'
		// }
	}


	//删除博客路由
	if(method === 'POST' && req.path === '/api/blog/delete'){
		const deleteBlogData = deleteBlog(id)
		if(deleteBlogData){
			return new SuccessModel('删除博客成功')
		} else {
			return new ErrorModel('删除博客失败...')
		}

		// return {
		// 	message: '删除博客的接口'
		// }
	}
}


module.exports = handleBlogRoute