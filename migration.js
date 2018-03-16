const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

createArtist = "CREATE TABLE Artist ( \
  id INTEGER PRIMARY KEY, \
  name TEXT NOT NULL, \
  date_of_birth TEXT NOT NULL, \
  biography TEXT NOT NULL, \
  is_currently_employed INTEGER DEFAULT 1 \
  )";

createSeries = "CREATE TABLE Series ( \
  id INTEGER PRIMARY KEY, \
  name TEXT NOT NULL, \
  description TEXT NOT NULL)";

createIssue = "CREATE TABLE Issue ( \
  id INTEGER PRIMARY KEY, \
  name TEXT NOT NULL, \
  issue_number TEXT NOT NULL, \
  publication_date TEXT NOT NULL, \
  artist_id INTEGER NOT NULL, \
  series_id INTEGER NOT NULL, \
  FOREIGN KEY(artist_id) REFERENCES Artist(id), \
  FOREIGN KEY(series_id) REFERENCES Series(id))";




db.run("drop table if exists Artist", (err)=> {
  if (err) {
    console.log(err);
  }
  db.run(createArtist);
});

db.run("drop table if exists Series", (err)=> {
  if (err) {
    console.log(err);
  }
  db.run(createSeries);
});

db.run("drop table if exists Issue", (err)=> {
  if (err) {
    console.log(err);
  }
  db.run(createIssue);
});
