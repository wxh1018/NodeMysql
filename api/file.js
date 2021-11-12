const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')

router.post('/excel', (req, res) => {
    const fileName = req.query.name
    const excelPath = path.join(__dirname, '../file', '每日任务.xlsx')
    const stats = fs.statSync(excelPath);
    // res.download(excelPath)
    res.set({
        "Content-type": "application/octet-stream",
        "Content-Disposition": "attachment;filename=" + encodeURI(fileName),
        'Content-Length': stats.size
    });
    let fReadStream = fs.createReadStream(excelPath);
    fReadStream.pipe(res);
})
router.get('/excel', (req, res) => {
    const excelPath = path.join(__dirname, '../file', '每日任务.xlsx')
    res.download(excelPath)
})

router.post('/excel2', (req, res) => {
    const excelPath = path.join(__dirname, '../file', 'changjizhoushuikuxushuiBB.xlsx')
    res.download(excelPath)
})



router.get('/channel/channel/page/1/10', (req, res) => {
    res.send({
        data: [
            {
                channelName: '1',
                status: 0
            },
            {
                channelName: '2',
                status: 1
            }, {
                channelName: '3',
                status: 1
            }, {
                channelName: '4',
                status: 1
            }, {
                channelName: '5',
                status: 0
            }, {
                channelName: '6',
                status: 0
            },
        ],
        count: 6
    })
})

router.get('/pdf', (request, response) => {
  const filePath = path.join(__dirname, '../file', '104.pdf')
  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {//如果没有报错的话，那就执行这里面的操作，并且保存文件状态
        response.writeHead(200);//发送200请求成功状态码
        fs.createReadStream(filePath).pipe(response);
    }else {//如果文件报错或者文件没找到，就执行这里面的操作
        response.writeHead(404);// 发送404响应
        response.end(`404 Not Found`);
    }
  });
})

module.exports = router
