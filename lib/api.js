var api = require('beer');

var API = function(type, params) {
    if (params) this.parent = params;
    this.type = type;
}

var routerMap = function(type, params) {
    var map = {
        app: {
            list: 'app/coderlib/api/app/list',
            read: 'app/editor/api/metadata/get/' + params.name,
            update: 'app/editor/api/savesettings/' + params.name,
            export: 'app/coder/api/app/export/' + params.name
        },
        code: {
            read: 'app/editor/api/getcode/' + params.name,
        },
        media: {
            list: 'app/editor/api/media/list/' + params.name,
        },
        owner: {
            update: 'app/auth/api/coderowner/set'
        },
        name: {
            update: 'app/auth/api/devicename/set'
        },
        password: {
            update: 'app/auth/api/changepassword'
        },
        wifi: {
            list: 'app/wifi/api/wifi/list'
        }
    }
    return map[type][params.action];
}

API.prototype.export = function(name, cb) {
    var parent = this.parent,
        self = this;
    api.put(info.server + routerMap(self.type, {
        action: 'export',
        name: name
    }), {
        headers: {
            'Cookie': parent.cookie,
            'Host': parent.host
        }
    }, function(err, result) {
        cb(err, result.body);
    });
}

API.prototype.update = function(params, cb) {
    var parent = this.parent,
        self = this;
    api.put(info.server + routerMap(self.type, {
        action: 'update'
    }), {
        headers: {
            'Cookie': parent.cookie,
            'Host': parent.host
        },
        form: params
    }, function(err, result) {
        cb(err, result.body);
    });
}

API.prototype.read = function(params) {
    var parent = this.parent,
        self = this;
    api.get(info.server + routerMap(self.type,{
        action: 'read',
        app: params
    }), {
        headers: {
            'Cookie': parent.cookie,
            'Host': parent.host
        }
    }, function(err, result) {
        cb(err, result.body);
    });
}

API.prototype.add = function(params, cb) {
    var parent = this.parent,
        self = this;
    api.post(info.server + routerMap(self.type, {
        action: 'add'
    }), {
        headers: {
            'Cookie': parent.cookie,
            'Host': parent.host
        }
    }, function(err, result) {
        cb(err, result.body);
    });
}

API.prototype.list = function(cb) {
    var parent = this.parent,
        self = this;
    api.get(info.server + routerMap(self.type, {
        action: 'list'
    }), {
        headers: {
            'Cookie': parent.cookie,
            'Host': parent.host
        }
    }, function(err, result) {
        cb(err, result.body);
    });
}

API.prototype.remove = function() {
    var parent = this.parent,
        self = this;
    api.delete(info.server + routerMap(self.type,{
        action: 'remove'
    }), {
        headers: {
            'Cookie': parent.cookie,
            'Host': parent.host
        }
    }, function(err, result) {
        cb(err, result.body);
    });
}

module.exports = API;