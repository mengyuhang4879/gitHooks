module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            //第一个参数为level，可选0,1,2，0为disable，1为warning，2为error；第二个参数为应用与否，可选always|never，第三个参数为包含哪些关键字数组
            2,
            'always',
            [
                'build', //构建
                'ci', //持续集成修改
                'docs', //文档更新
                'feat', //新功能
                'fix', //问题修复
                'perf', //性能升级
                'refactor', //功能重构
                'revert', //回滚
                'style', //样式更新
                'test', //单元测试/测试
                'chore' //除上述之外的
            ]
        ],
        'header-max-length': [2, 'always', 72], // 简述限制72字符长度
        'scope-case': [2, 'always', 'lowerCase'], // scope小写
        'subject-empty': [2, 'never'], // subject不为空
        'subject-full-stop': [2, 'never', '.'], // subject结尾不加'.'
        'type-case': [2, 'always', 'lowerCase'], // type小写
        'type-empty': [2, 'never'] // type不为空
    }
};
