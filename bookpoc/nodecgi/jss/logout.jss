<?
	var read = require('fs').readFileSync;
    var ejs = require('/Users/muellerfan/Sites/iwt/bookpoc/nodecgi/node_modules/ejs');
	var file = read('/Users/muellerfan/Sites/iwt/bookpoc/nodecgi/views/logout.ejs', 'utf-8');

    session.data.name = "";

    write(ejs.render(file));
?>

