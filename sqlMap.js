const sqlMap = {
    auth: {
        login: 'select * from user where username = ?',
        regist: 'insert into user set ?',
        check: (key) => 'select * from user where ' + key + ' = ?'
    }
}
module.exports = sqlMap