//⚡️⚡️ fs 为读取文件的方法
const fs = require('fs')
const path = require('path')



//读取文件内容的方法

//🌟🔥🔥 写法一: Promise 的写法 ————————————————————————————————————————————————————
function getFileContent(filename) {
	// 🔥创建 promise 实例
	const promise = new Promise((resolve, reject)=>{
		
		//⚡️⚡️⚡️拼接出【数据文件】的【绝对路径】: 先获取 【index 文件所在的路径】,然后再拼接【data】文件所在的路径, 然后再拼接上【filename】
		const fullFilename = path.resolve(__dirname, 'data', filename)

		//传入文件的绝对路径, 获取文件内的【最终数据】
		fs.readFile(fullFilename, (err, dataInfo) => {
			if(err){
				reject(err) //异常
				return
			}
			
			resolve(//返回数据给调用者
				JSON.parse(dataInfo.toString()) //dataInfo 原本是二进制,可以转为 JSON 对象(转为字符串格式)
			)
			// console.log(
			// 	JSON.parse(dataInfo.toString()) //dataInfo 原本是二进制,可以转为 JSON 对象(转为字符串格式)
			// )
		})
	})

	// 🔥最后记得 return promise
	return promise
}

getFileContent('a.json').then(aData=>{
	console.log(aData)
	return getFileContent(aData.next)
}).then((bData)=>{
	console.log(bData)
	return getFileContent(bData.next)
}).then((cData)=>{
	console.log(cData)
})



//写法二: 回调地狱 ——————————————————————————————————————————————————————
// function getFileContent(filename, callback) {//第二个参数是【回调函数】，能够把读【取到的内容】返回给调用者

// 	//⚡️⚡️⚡️拼接出【数据文件】的【绝对路径】: 先获取 【index 文件所在的路径】,然后再拼接【data】文件所在的路径, 然后再拼接上【filename】
// 	const fullFilename = path.resolve(__dirname, 'data', filename)

// 	//传入文件的绝对路径, 获取文件内的【最终数据】
// 	fs.readFile(fullFilename, (err, dataInfo) => {
// 		if(err){
// 			console.error(err)//异常
// 			return
// 		}
		
// 		callback(//返回数据给调用者
// 			JSON.parse(dataInfo.toString()) //dataInfo 原本是二进制,可以转为 JSON 对象(转为字符串格式)
// 		)
// 		// console.log(
// 		// 	JSON.parse(dataInfo.toString()) //dataInfo 原本是二进制,可以转为 JSON 对象(转为字符串格式)
// 		// )
// 	})
// }


// getFileContent('a.json', (aData)=>{
// 	console.log(aData)
// 	console.log(aData.message)
// 	getFileContent(aData.next, (bData)=>{//通过 next 获取下一份数据，因为 {} 内写了 next 是谁！
// 		console.log(bData)
// 	})
// })
