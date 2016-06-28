<?
	var read = require('fs').readFileSync;
    var ejs = require('/Users/muellerfan/Sites/iwt/bookpoc/nodecgi/node_modules/ejs');
	var file = read('/Users/muellerfan/Sites/iwt/bookpoc/nodecgi/views/session1.ejs', 'utf-8');

    var params = {value: ""};

    if (session.data.name){
        params.value = session.data.name;
    }

	write(ejs.render(file, params));
?>

