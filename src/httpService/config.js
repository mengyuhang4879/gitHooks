let HISTORY = '';

if (process.env.NODE_ENV === 'development') {
    HISTORY = 'https://bapi-ptc.grtcloud.net';
}

const serverConfig = {
    baseURL: HISTORY, // 请求基础地址,可根据环境自定义
    useTokenAuthorization: true // 是否开启 token 认证
};

export default serverConfig;
