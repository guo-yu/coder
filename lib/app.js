// perpare view, static files and app files
var dir = require('./dir');

// 新建应用时应先调用coder的http接口，在服务器上新建好用户之后（保持同一个用户新建的文件夹和文件）
// 然后把相应的文件拖下来。而不是在本地使用swig拼接好文件再上传上去
// 如果要使用程序部署的方式来在本地直接scp部署进去，就要知道程序跑的用户名和密码
exports.create = function() {
    console.log(dir.working);
}

exports.deploy = function() {
    
}