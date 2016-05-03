<?
	var read = require('fs').readFileSync;
    var ejs = require('/Users/muellerfan/Sites/iwt/bookpoc/nodecgi/node_modules/ejs');
	var file = read('/Users/muellerfan/Sites/iwt/bookpoc/nodecgi/views/hello.ejs', 'utf-8');

	response.headers['x-content-from'] = 'node-cgi';

	write(ejs.render(file, {serverTime: new Date()}));
?>

