var path = require('path')
var express = require('express')
// const conn = require('./connect')
const cors = require('cors')//跨域处理


// 加载body-parser 处理post提交过来的数据
var bodyParser = require('body-parser');
var jsonParse = bodyParser.json()
var app = express()
var apiRoutes = express.Router()
app.use(bodyParser.urlencoded({ extended: false }))
//设置中间件
app.use(bodyParser.json())
app.use("/*", cors())


app.use('/', express.static((__dirname, './html')))

app.use('/file', require('./api/file'))


//嘉兴水务
app.use('/waterdispatch', require('./api/waterdispatch'))

// app.use('/auth', require('./api/auth'));




// app.post('/login', (req, res) => {
//     const { username, password } = req.body
//     console.log(username, password);
//     let query = "select username,password from user where username = '" + username + "' and password = '" + password + "'"
//     conn.query(query, (error, results, fields) => {
//         if (error) throw error;
//         if (results.length == 0) {
//             res.json({
//                 code: false,
//                 msg: '用户名或密码错误'
//             })
//         } else {
//             res.json({
//                 code: true,
//                 msg: '登录成功'
//             })
//         }
//         res.end();
//     });
// })


var server = app.listen(1018, 'localhost', function () {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})

