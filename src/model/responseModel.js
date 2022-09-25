//响应的数据模型
class BaseModel {
	constructor(data, message) {
		if(typeof data === 'string'){//如果传入的数据格式是字符串（做多一层兼容性的判断）
			this.message = data//把 message 设置为 data
			data = null
			message = null
		}
		if(data) {
			this.data = data
		}
		if(message) {
			this.message = message
		}
	}
}


// 请求成功的数据模型
class SuccessModel extends BaseModel {
	constructor(data, message) {
		super(data, message)//执行【父类】的构造函数
		this.errno = 0//在类的实例上提拿开一个数据, 失败后前端会接收到 -1 这个数据
	}
}


// 请求失败的数据模型
class ErrorModel extends BaseModel {
	constructor(data, message) {
		super(data, message)//执行【父类】的构造函数
		this.errno = -1//在类的实例上设置一个数据, 失败后前端会接收到 -1 这个数据
	}
}

module.exports = {
	SuccessModel,
	ErrorModel
}