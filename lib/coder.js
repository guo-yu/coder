// connect to coder
var client = require('scp2'),
    dirs = require('./dir'),
    path = require('path'),
    API = require('./api'),
    api = require('beer');

var Coder = function(params) {
    this.host = params.host ? params.host : 'coder.local';
    this.username = params.username ? params.username : 'pi';
    this.password = params.password;
    this.path = params.path ? params.path : '/home/coder/coder-dist/coder-base';
    this.server = 'https://' + this.host + '/';
    Coder.prototype.app = new API('app',this);
    Coder.prototype.code = new API('code',this);
    Coder.prototype.media = new API('media',this);
    Coder.prototype.owner = new API('owner',this);
    Coder.prototype.device = new API('device',this);
}

// signin mocker 
Coder.prototype.auth = function(params, cb) {
    var self = this;
    api.post(self.server + 'app/auth/api/login',{
        form: {
            password: params.password
        }
    },function(err, result){
        // cookie must be save
        if (!err) {
            if (result.body.status == 'ok') {
                console.log(result.response);
                self.cookie = result.response.headers['Cookie'];
                cb(null, result.body);
            } else {
                cb(result.body.error)
            }
        } else {
            cb(err);
        }
    })
}

// download via scp2
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

// upload via scp2
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