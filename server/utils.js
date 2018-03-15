const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');
const validTables = ['Artist' , 'Series' , 'Issue'];
