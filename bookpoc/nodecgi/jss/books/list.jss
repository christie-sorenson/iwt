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

    if (process.env.REQUEST_METHOD === 'GET'){
        if (request.query.delete){
            deleteBook();
        }
        else{
            listBooks();
        }
    }
    else if (process.env.REQUEST_METHOD === 'POST'){
        addBook();
    }

    function listBooks(){

        connection.query('SELECT * from Books ORDER BY id', function(err, books, fields) {
            if (err) throw err;

    	    var file = read('/Users/muellerfan/Sites/iwt/bookpoc/nodecgi/views/books/list.ejs', 'utf-8');
    		write(ejs.render(file, {books: books}));
        });

        connection.end();
    }

    function deleteBook(){
      var id = req.params.book_id;
      connection.query('DELETE from books where id = ' + id, function(err){
        if (err) throw err;

        res.json({ message: 'Book Deleted' });
      });

      connection.end();
    };

    function addBook(){
      var title = mysql.escape(request.post.form.title);
      var author = mysql.escape(request.post.form.author);
      var price = mysql.escape(request.post.form.price);

      var queryString = 'INSERT INTO books (title, author, price) VALUES (' + title + ', ' + author + ', ' + price + ')';
      connection.query(queryString, listBooks);
    };

    function updateBook(){
      var id = req.params.book_id;
      var title = db.escape(req.body.title);
      var author = db.escape(req.body.author);
      var price = db.escape(req.body.price);

      var queryString = 'UPDATE books SET title = ' + title + ', author = ' + author + ', price = ' + price + ' WHERE id = ' + id;
      db.query(queryString, function(err){
        list(req, res);
      });
    };
?>

