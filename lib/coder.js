// connect to coder
var client = require('scp2'),
    dirs = require('./dir'),
    path = require('path');

var Coder = function(params) {
    this.host = params.host ? params.host : 'coder.local';
    this.username = params.username ? params.username : 'root';
    this.password = params.password;
    this.path = params.path ? params.path : '/home/coder/coder-dist/coder-base';
}

Coder.prototype.download = function(file, cb) {
    var self = this,
        callback = (!cb) ? file : cb;
    client.scp({
        host: self.host,
        username: self.username,
        password: self.password,
        path: (file && typeof(file) == 'string') ? file : self.path
    }, dirs.working.dir, function(err) {
        callback(err);
    });
}

Coder.prototype.upload = function(file, cb) {
    var self = this;
    client.scp(path.join(dirs.working.dir, file), {
        host: self.host,
        username: self.username,
        password: self.password,
        path: self.path
    }, function(err) {
        cb(err)
    });
}

module.exports = Coder;