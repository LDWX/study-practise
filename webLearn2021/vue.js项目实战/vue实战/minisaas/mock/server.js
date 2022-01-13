// 利用mockjs本地化静态管理
import Mock from 'mockjs'
// 引入模板
import user from './bm/user'

// 加载mock函数
const { mock } = Mock;

// 匹配响应规则模板
mock(/\api\/users\/login/, 'post', user.login);
mock(/\api\/users\/profile/, 'get', user.profile);
mock(/\api\/users\/logout/, 'get', user.logout);

// 方法2：
// var express = require("express")
// var app = express()
// var router = express.Router();
// app.get('/', function(req, res) {
//     res.send();
// })

// app.use('/mock', router)
// app.listen(3000)