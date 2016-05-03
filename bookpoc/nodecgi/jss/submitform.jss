<?
	var read = require('fs').readFileSync;
    var ejs = require('/Users/muellerfan/Sites/iwt/bookpoc/nodecgi/node_modules/ejs');
	var file = read('/Users/muellerfan/Sites/iwt/bookpoc/nodecgi/views/submitform.ejs', 'utf-8');

    var params = {
        headers: request.headers,
        getData: request.query,
        postData:request.post.form
    };

	write(ejs.render(file, params));
?>

