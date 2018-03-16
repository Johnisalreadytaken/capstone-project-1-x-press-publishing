const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;

const artistRouter = require('./server/artist.js');
const seriesRouter = require('./server/series.js');

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api/artists', artistRouter);
app.use('/api/series', seriesRouter);
app.use(errorhandler());

app.listen(PORT, ()=> {
  console.log(`listening on port: ${PORT}.`);
});

module.exports = app;
