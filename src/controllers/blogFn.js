//操作数据库，获得 blog 的方法
const { execSQL } = require('../dbUtils/mysqlFn')



//获取博客列表(此处定义后，在上游使用)
//localhost:5050/api/blog/list?author=Zen&keyword=标题
const getBlogList = (author, keyword) => {
	//👇引入 sql 方法获取真数据, 因为需要拼接【条件】，所以加上 where
	let sql = `select * from blogs where 2=2 ` //小技巧, 因为 where 必传, 所以让 【2=2】, 这里表示一个条件, 达成了则返回所有 list //🔥每个条件后面记得加空格！

	if(author){//⚡️如果传入了作者, 就拼接上作者的 sql 查询条件
		sql += `and author='${author}' `;  //🔥每个条件后面记得加空格！
	}

	if(keyword){//⚡️如果传入了 keyword, 就拼接上作者的 sql 查询条件
		sql += `and title like '%${keyword}%'`;//模糊查询, 🔥注意 like 的语法
	}

	return execSQL(sql)//返回查询结果, 返回的是一个 promise 对象, 所以可以在上游去调用 then 方法


	// execSQL(sql).then(result =>{//🔥拿到 sql 的查询结果
	// 	console.log(result)
	// })

	// 👇这里先用【假数据】, 最终实现应该是从数据库中读取数据
	// return [
	// 	{
	// 		id: 1,
	// 		title: '标题1',
	// 		content: '内容1',
	// 		author: 'Zen',
	// 		createTime: 1561234567890,
	// 	},
	// 	{
	// 		id: 2,
	// 		title: '标题2',
	// 		content: '内容3',
	// 		author: 'Jimmy',
	// 		createTime: 1561234567846,
	// 	}
	// ]
}







//获取博客详情(此处定义后，在上游使用)
const getBlogDetail = (id) => {
	let sql = `select * from blogs where id='${id}'` //传入博客的 id

	return execSQL(sql).then(rows => {//获得唯一的一项 rows
		console.log(rows)//rows 是个数组
		return rows[0]
	})


	// //👇这里先用【假数据】, 最终实现应该是从数据库中读取数据
	// return [
	// 	{
	// 		id: 1,
	// 		title: '标题1',
	// 		content: '内容123456789',
	// 	},
	// 	{
	// 		id: 2,
	// 		title: '标题2',
	// 		content: '内容123456789',
	// 	}
	// ]
}






//创建新博客, 【传入 blogData , 然后默认为空 {}】, (此处定义后，在上游使用)
const createNewBlog = (blogData = {}) => { //blogData 用来更细博客数据
	//blogData 内有 blog 的 title、content, 先获取这些数据，再通过 sql 存入数据库中
	const title = blogData.title
	const content = blogData.content
	const author = 'Zen'// mock ，因为没有登录的用户信息
	// const author = blogData.author
	const createAt = Date.now()//创建时间为现在
	
	let sql = `insert into blogs (title, content, author, createAt) values ('${title}', '${content}', '${author}', ${createAt})` //🔥注意 sql 语法, createAt 为数字, 所以不用加引号
	return execSQL(sql).then(insertedResult => {
		console.log(insertedResult)
		return {
			id: insertedResult.insertId //返回拿到的 id
		}
	})


	// //👇这里先用【假数据】, 最终实现应该是从数据库中读取数据
	// return {
	// 	id:1
	// }
}




//更新博客, blogData 默认为空 {}, (此处定义后，在上游使用)
const updateBlog = (id, blogData = {}) => {
	const title = blogData.title
	const content = blogData.content
	const sql = `update blogs set title='${title}', content='${content}' where id=${id}` //数字 id，不需要加引号

	return execSQL(sql).then(updateResult => {
		console.log(updateResult)
		if(updateResult.affectedRows > 0){//里边有个 affectedRows 属性, 可以用来判断是否更新成功
			return true
		}
		return false
	})

	// console.log(id, blogData)
	// return false
} 



//删除博客(此处定义后，在上游使用)
const deleteBlog = (id, author) => {//🔥接收 author ，让作者才能删除博客，⚡️要考虑安全性问题！
	const sql = `delete from blogs where id=${id} and author='${author}'`

	return execSQL(sql).then(deleteResult =>{
		console.log(deleteResult)
		if(deleteResult.affectedRows > 0){
			return true
		}
		return false
	})
	// console.log(id)
	// return true
}



module.exports = {
	getBlogList,
	getBlogDetail,
	createNewBlog,
	updateBlog,
	deleteBlog
}