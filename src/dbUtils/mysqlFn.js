// 一: 引入 mySQL
const mysql = require('mysql')
const { MySQL_CONFIG } = require('../config/dbConfig.js')


// 二: 创建【连接对象】并保存到一个常量中
const connection = mysql.createConnection(
	// {
	// 👇做法一：直接写配置
	// host: 'localhost',
	// user: 'root',
	// port: 3306,
	// password: '11112222',
	// database: 'myblog'
	// }
	
	// 👇做法二：抽离配置项
	MySQL_CONFIG
)


// 三: 开始链接 MySQL
connection.connect()




// 四: 🔥核心执行 sql 语句的工具函数, 然后再【⚡️⚡️ 在路由中进行调用，定义 sql 的方法！！】
//promise 写法
function execSQL(sql){
	const promise = new Promise((resolve, reject) => {
		connection.query(sql, (err, result) => {
			if(err) {
				reject(err)
				// console.error(err)
				return
			}
			resolve(result)
			// console.log(result)
		})
	})
	return promise
}



// 五: 关闭连接
// connection.end()



// 六: 导出
module.exports = {
	execSQL
}
