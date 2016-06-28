<?
	var read = require('fs').readFileSync;
    var ejs = require('/Users/muellerfan/Sites/iwt/bookpoc/nodecgi/node_modules/ejs');
	var file = read('/Users/muellerfan/Sites/iwt/bookpoc/nodecgi/views/hello.ejs', 'utf-8');

	response.headers['content-type'] = 'text/plain';

	write(ejs.render(file, {serverTime: new Date()}));
?>

