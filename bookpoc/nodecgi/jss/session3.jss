<?
	var read = require('fs').readFileSync;
    var ejs = require('/Users/muellerfan/Sites/iwt/bookpoc/nodecgi/node_modules/ejs');
	var file = read('/Users/muellerfan/Sites/iwt/bookpoc/nodecgi/views/session3.ejs', 'utf-8');

    var params = {};

    if (session.data.name){
        params.message = "Hello " + session.data.name;
        params.loggedIn = true;
    }
    else{
        params.message = "Hello.  You are not logged in."
        params.loggedIn = false;
    }

	write(ejs.render(file, params));
?>

