/*const Promise = require('bluebird');
const mysql = require('mysql2');
const Connection = require('mysql2/lib/connection');
Promise.promisifyAll([Connection]);*/

var mysql = require('promise-mysql');
var config = require('./config');

var MySQL = function() {
    var connection;
    
    return {
        init: function(){
            mysql.createConnection({
                host     : config.DATABASE_HOST,
                user     : config.DATABASE_USER,
                password : config.DATABASE_PASSWORD,
                database : config.DATABASE_NAME
            }).then(function(conn){
                MySQL.connection = conn;
            });

        },

        query: async function (querystring){
            return await MySQL.connection.query(querystring);
        }
    }
}();

module.exports = MySQL;
