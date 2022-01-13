import { Random } from "mockjs";

function login (req) {
    return {
        code: 200,
        data: {
            name: Random.cname(),
            uid: Random.guid(),
            message: '登录成功'
        }
    }
}

function profile (req) {
    return {
        code: 200,
        data: {
            name: Random.cname(),
            uid: Random.guid(),
            age: Random.integer(18, 60),
            message: '查询成功'
        }
    }
}

function logout (req) {
    return {
        code: 200,
        data: {
            name: Random.cname(),
            uid: Random.guid(),
            message: '登出成功'
        }
    }
}

export default {
    login,
    profile,
    logout
}