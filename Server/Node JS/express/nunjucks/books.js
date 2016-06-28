var db = require('./db');

module.exports.list = function(req,res){
    db.query('SELECT * from books', function(err, books) {
        if (err) throw err;
    
        res.render('books/list.njk', {books:books});
    });
};