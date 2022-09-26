// 一: 引入 mySQL
const mysql = require('mysql')


// 二: 创建【连接对象】并保存到一个常量中
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	port: 3306,
	password: '11112222',
	database: 'myblog'
})


// 三: 开始链接 MySQL
connection.connect()


// 四: 执行 sql 语句
// 🔍4-1 执行精准查询 sql
const sql = `select * from blogs`
connection.query(sql, (err, result) => {
	if(err) {
		console.error(err)
		return
	}
	console.log(result)
})


// 🔍4-2 执行新增 sql
const addSql = `insert into blogs (title, content, author, createAt) values ('标题8', '这是一段内容8', 'Zen', 1234567890192)`
connection.query(addSql, (err, result) => {
	if(err) {
		console.error(err)
		return
	}
	console.log(result)
})



// 五: 关闭连接
connection.end()


