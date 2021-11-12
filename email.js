var path = require('path')
var express = require('express')
var webpack = require('webpack')
var nodemailer = require("nodemailer");
const cors = require('cors')//跨域处理


// 加载body-parser 处理post提交过来的数据
var bodyParser = require('body-parser');
var app = express()
var apiRoutes = express.Router()
app.use("/*", cors())
app.use('/', express.static('./html'))

// bodyParser 设置,自动会在req上面添加
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
apiRoutes.post('/email', function (req, res) {
    console.info('req', req.body.name, req.body.email)
    var text = `这个人姓名叫${req.body.name}邮箱是${req.body.email}，欢迎骚扰`
    if (req.body.name && req.body.email) {
        res.json({
            iRet: 1,
            info: 'ok',
        });

        // Use Smtp Protocol to send Email
        var transporter = nodemailer.createTransport({
            //https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
            service: 'qq',
            port: 587, // SMTP 端口
            secure: false,
            // secureConnection: true, // 使用 SSL
            auth: {
                user: '1526859282@qq.com',
                //这里密码不是qq密码，是你设置的smtp密码
                pass: 'ihuszosugpsygbbi'
            }
        });

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: '1526859282@qq.com', // 这里的from和 上面的user 账号一样的
            to: req.body.email,
            subject: '我在学习发邮件', // 标题
            //text和html两者只支持一种
            text: text, // 标题
            html: '<b style="color:skyblue">Hello world ?</b>' // html 内容
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('邮件发送: ' + info.response);
            transporter.close();
        });

    } else {
        res.json({
            iRet: -1,
            info: 'error',
        });
        return;
    }
});
apiRoutes.post('/test', (req, res) => {
    res.json({ code: 1 })
})
app.use('/api', apiRoutes)


app.listen(8082, function () {
    console.info('复制打开浏览器', 'localhost:8082')
})
