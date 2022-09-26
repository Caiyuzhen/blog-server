const { SuccessModel,ErrorModel } = require('../model/responseModel')
const { getBlogList, getBlogDetail, createNewBlog, updateBlog, deleteBlog } = require('../controllers/blogFn')
// const { execSQL } = require('../dbUtils/mysqlFn')



//⚡️⚡️定义路由相关的 api 逻辑, 获得请求的方式和路径
const handleBlogRoute = (req, res) => { //接收 app.js 传来的两个参数
	
	// 👇管理所有路由都要用到的参数
	const id = req.query.id
	const method = req.method
	const blogData = req.body //本质上是从上方的 postData 传下来的数据
	const author = req.query.author || '' //拿到 author 参数, 没有则设置为空字符串
	const keyword = req.query.keyword || ''


	//可以在这一步解析 url 跟 path，也可以在上游 app.js 来设置
	// const url = req.url
	// const path = url.split('?')[0]


	//👇定义各种接口 ——————————————————————————————————————————————————
	/*🔥🔥🔥因为 app.js 已经把 path 设置到 req 上，所以 blog 方法就能通过 req 来获取 path！同理，因为 app.js 已经通过 query 解析除了路由的参数，所以能通过 req 获取到*/
	


	//获取博客列表路由
	if(method === 'GET' && req.path === '/api/blog/list'){

		//api/blog/list?author=jimmy&keyword=123

		// ⚡️getBlogList 会返回一个 promise, 所以可以用 then 来接收数据
		const listDataPromise = getBlogList(author, keyword)//传入上面拿到的 id 跟 keyword，并且保存数据的方法(定义在 controllers )

		//⚡️返回 promise 给 app.js 来使用, 所以可以在上游去调用 then 方法
		return listDataPromise.then((listData) => {
			return new SuccessModel(listData) //把【获得的数据】通过传入 【new Model 的方式】返回给【客户端】
		})

		// return {
		// 	message: '博客列表路由的接口'
		// }
	}




	// 获取博客详情路由
	if(method === 'GET' && req.path === '/api/blog/detail'){
		const detailDataPromise = getBlogDetail(id)

		return detailDataPromise.then(detailData => {
			return new SuccessModel(detailData)
		})
		// const id = req.query.id || ''//拿到博客 id，传入函数
		// const detailData = getBlogDetail(id)
		// console.log(id)
		
		// return {
		// 	message: '博客详情的接口'
		// }
	}




	//新增博客路由
	if(method === 'POST' && req.path === '/api/blog/new'){

		
		//实际业务中需要拿到【登录】的用户名，这里用【假用户名数据】
		const author = 'Zen'
		req.body.author = author //相当于放入了上方的 blogData ！！上面是解析出数据，这里是加入数据！

		const newBlogDataPromise = createNewBlog(blogData)

		return newBlogDataPromise.then(newBlogData => {
			return new SuccessModel(newBlogData)
		})
		// const blogData = req.body
		// const newBlogData = createNewBlog(blogData)
		// console.log(blogData)
		// return new SuccessModel(newBlogData)
		
		// return {
		// 	message: '新建博客的接口'
		// }
	}



	//更新博客路由
	if(method === 'POST' && req.path === '/api/blog/update'){
		// const blogData = req.body
		const updateBlogDataPromise = updateBlog(id, blogData) //updateBlogData 是结果，为 true 或 false

		return updateBlogDataPromise.then(updateBlogData => {
			if(updateBlogData){
				// console.log(updateBlogData)
				return new SuccessModel('更新博客成功')
			} else {
				return new ErrorModel('更新博客失败...')
			}
		})

		// console.log(req.body)
		// return {
		// 	message: '更新博客的接口'
		// }
	}


	//删除博客路由
	if(method === 'POST' && req.path === '/api/blog/delete'){

		//实际业务中需要拿到【登录】的用户名，这里用【假用户名数据】
		const author = 'Zen'
		// req.body.author = author //相当于放入了上方的 blogData ！！上面是解析出数据，这里是加入数据！

		const deleteBlogDataPromise = deleteBlog(id, author)
		

		return deleteBlogDataPromise.then(delBlogData => {
			if(delBlogData){
				return new SuccessModel('删除博客成功')
			} else {
				return new ErrorModel('删除博客失败...')
			}
		})


		// return {
		// 	message: '删除博客的接口'
		// }
	}
}


module.exports = handleBlogRoute