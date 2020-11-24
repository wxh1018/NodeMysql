const router = require('express').Router()
const conn = require('../connect')
const sqlMap = require('../sqlMap')


router.post('/regist', async (req, res) => {
    const user = req.body
    //查询有没有注册过
    const { username } = user
    let fg = await check({ username })
    if (fg) {
        res.json({
            msg: '该用户已经注册',
            code: false
        })
    } else {
        const sqlStr = sqlMap.auth.regist
        conn.query(sqlStr, user, (err, results) => {
            if (err) {
                throw error
                return
            }
            res.json({ msg: 'hello' + req.body.username + ',你已注册成功', code: true })
            res.end()
        })
    }

})

function check(obj) {
    let key = Object.keys(obj)[0]
    return new Promise((reslove, reject) => {
        let check = sqlMap.auth.check(key)
        conn.query(check, obj[key], (err, results) => {
            if (results.length == 0) {
                reslove(false)
            } else {
                reslove(results[0])
            }
        })
    })
}

module.exports = router