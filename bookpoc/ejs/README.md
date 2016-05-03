# JavaScript CRUD - List and Delete - EJS/Express Version

An example to show how to do an express CRUD using MySQL and EJS.  We have 4 examples:
* Full postback/no ajax (server side template)
* Hybrid (full load on list and ajax on the rest) (server side template)
* Full Ajax (client side template)
* Ajax and Local Storage/Offline (client side template)

# Setting Up

* Setup a MySQL database.
* Run `books.sql` in your database to setup the test data.
* Update the credentials in `config-template.js` and rename file to `config.js`

# Build/Run
For each example, you must follow these directions.

```sh
$ cd example_directory
$ npm install
$ node server.js
```

# View
Point your browser at [http://localhost:3000/books](http://localhost:3000/books)

