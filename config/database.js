var mysql = require('mysql')
var util = require('util')

var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'shopee'
})

pool.query = util.promisify(pool.query)

module.exports = pool;
