/* 
    promise封装ajax
    接收参数为object
    {
        type：请求类型(默认为GET/String),
        url：请求地址(String),
        async：是否为异步(默认为true/Boolean),
        data：请求的数据(Objeck),
        parameter: 'params' 设置为params传参(固定参数),
        paramsData：params传参的数据(String)
    }
*/
// 服务器地址
const baseURL = 'http://127.0.0.1:3000'

const request = (options) => {
    return new Promise((resolve, reject) => {
        // 没有type属性时设置type默认属性为GET,如果type值为小写转为大写
        options.hasOwnProperty('type') ? options.type = options.type.toUpperCase() : options.type = 'GET'
        // 没有data属性时，data进行初始化
        options.hasOwnProperty('data') ? options.data : options.data = {}
        // 没有async属性时设置async默认属性为true
        options.hasOwnProperty('async') ? options.async : options.async = true
        const { type, url, async, data, parameter, paramsData } = options
        // 将data转为以&符分割的字符串
        const arr = []
        for (const key in data) {
            arr.push(key + '=' + data[key])
        }
        const params = arr.join('&')
        const xhr = new XMLHttpRequest()
        // 判断请求/参数的类型
        if (parameter === 'params' && type === 'GET' || type === 'DELETE'){
            xhr.open(type, baseURL + url + '/' + paramsData, async)
            xhr.send()
        } else if (type === 'GET' || type === 'DELETE') {
            xhr.open(type, params === '' ? baseURL + url : baseURL + url + '?' + params, async)
            xhr.send()
        } else if (type === 'POST' || type === 'PUT') {
            xhr.open(type, baseURL + url, async)
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
            xhr.send(params)
        }
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.response)
            }else if (xhr.status === 404){
                reject(xhr.status)
            }
        }
    })
}

export default request