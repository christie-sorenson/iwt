<?
	var read = require('fs').readFileSync;
    var ejs = require('/Users/muellerfan/Sites/iwt/bookpoc/nodecgi/node_modules/ejs');
	var file = read('/Users/muellerfan/Sites/iwt/bookpoc/nodecgi/views/environment.ejs', 'utf-8');


    var processParam = {
        version: process.version,
        execPath: process.execPath,
        argv: process.argv
    };

    var params = {
        headers: request,
        process: processParam,
        env: process.env
    };

	write(ejs.render(file, params));
?>

