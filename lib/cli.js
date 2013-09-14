var optimist = require('optimist'),
    argv = optimist.argv,
    consoler = require('consoler'),
    app = require('./app'),
    Coder = require('./coder');

var commands = {
    init: function(params) {
        consoler.loading('creating app...');
    },
    connect: function(params) {
        if (params.length === 1) {
            var coder = new Coder({
                password: params[0]
            });
            coder.upload('/demo.txt',function(err) {
                console.log(err);
            });
        }
    },
    download: function(params) {
        if (params.length === 1) {
            consoler.loading('download app ' + params[0]);
        }
    },
    deploy: function() {

    },
    help: function() {

    }
}

exports.cli = function() {
    var params = argv._,
        command = params[0],
        param = params.slice(1);
    if (command) {
        if (commands[command]) {
            commands[command](param);
        } else {
            consoler.error('what do you want ? try $ coder help')
        }
    } else {
        consoler.error('what do you want ? try $ coder help')
    }
}