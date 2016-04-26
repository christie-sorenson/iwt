<?
	var read = require('fs').readFileSync;
    var mysql      = require('/Users/muellerfan/Sites/iwt/bookpoc/nodecgi/node_modules/mysql');
	var ejs = require('/Users/muellerfan/Sites/iwt/bookpoc/nodecgi/node_modules/ejs');
	var config = require('/Users/muellerfan/Sites/iwt/bookpoc/nodecgi/config');

    var connection = mysql.createConnection({
      host     : config.DATABASE_HOST,
      user     : config.DATABASE_USER,
      password : config.DATABASE_PASSWORD,
      database : config.DATABASE_NAME
    });
    
    connection.connect();
    
    connection.query('SELECT * from Books', function(err, books, fields) {
      if (err) throw err;
 
		var file = read('/Users/muellerfan/Sites/iwt/bookpoc/nodecgi/views/books/list.ejs', 'utf-8');
		write(ejs.render(file, {books: books}));
    });
    
    connection.end();
?>

