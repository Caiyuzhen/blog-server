//操作数据库，获得 blog 的方法

//获取博客列表
const getBlogList = (author, keyword) => {
	//最终实现应该是从数据库中读取数据，这里先用【假数据】
	return [
		{
			id: 1,
			title: '标题1',
			content: '内容1',
			author: 'Zen',
			createTime: 1561234567890,
		},
		{
			id: 2,
			title: '标题2',
			content: '内容3',
			author: 'Jimmy',
			createTime: 1561234567846,
		}
	]
}



//获取博客详情
const getBlogDetail = (id) => {
	//最终实现应该是从数据库中读取数据，这里先用【假数据】
	return [
		{
			id: 1,
			title: '标题1',
			content: '内容123456789',
		},
		{
			id: 2,
			title: '标题2',
			content: '内容123456789',
		}
	]
}



//创建新博客, blogData 默认为空 {}
const createNewBlog = (blogData ={}) => { //blogData 用来更细博客数据
	//blogData 内有 blog 的 title、content, 可以把这些数据存入数据库中
	return {
		id:1
	}
}




//更新博客, blogData 默认为空 {}
const updateBlog = (id, blogData = {}) => {
	// console.log(id, blogData)
	return true
} 



//删除博客
const deleteBlog = (id) => {
	// console.log(id)
	return true
}



module.exports = {
	getBlogList,
	getBlogDetail,
	createNewBlog,
	updateBlog,
	deleteBlog
}