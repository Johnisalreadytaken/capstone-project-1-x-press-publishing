const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');



const artistRouter = require('./server/artist');
app.use('/api/artists', artistRouter);

const seriesRouter = require('./server/series');
app.use('/api/series', seriesRouter);

app.use(morgan('dev'));


app.listen(PORT, ()=> {
  console.log(`listening to ${PORT}.`);
});
