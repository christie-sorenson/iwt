var db = require('./db');
var books = require('./books');
var users = require('./users');
const port = 3000;

db.init();

var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mySession = session({
  secret: 'N0deJS1sAw3some',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
});


var app = express();
app.use(mySession);
var router = express.Router();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

/* Routes - consider putting in routes.js */
app.get('/login', users.loginForm);
app.post('/login', users.login);
app.get('/logout', users.logout);

/*  This must go between the users routes and the books routes. */
app.use(users.auth);

/*  Must come after users.auth to ensure even static pages are authenticated */
app.use(express.static('public'));

/*  TODO: REMOVE router/use app.whatever */
/*  Could have used router for cleaner code, but used app.method to make paths clear. */
router.route('/books')

  .get(books.list)

  .post(books.add)

router.route('/books/:book_id')

  .delete(books.delete)

  .put(books.update)

app.use('/api', router);

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});