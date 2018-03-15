const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

createArtist = "CREATE TABLE Artist ( \
  id INT primary key, \
  name TEXT NOT NULL, \
  date_of_birth TEXT NOT NULL, \
  biography TEXT NOT NULL, \
  is_currently_employed INT default 1 \
  )";

createSeries = "CREATE TABLE Series ( \
  id INT primary key, \
  name TEXT NOT NULL, \
  description TEXT NOT NULL)";

createIssue = "CREATE TABLE Issue ( \
  id INT primary key, \
  name TEXT NOT NULL, \
  issue_number TEXT NOT NULL, \
  publication_date TEXT NOT NULL, \
  artist_id INT NOT NULL, \
  series_id INT NOT NULL, \
  FOREIGN KEY(artist_id) REFERENCES Artist(id), \
  FOREIGN KEY(series_id) REFERENCES Series(id))";

db.run(createArtist, (err)=> {
  if (err) {
    console.log(err);
  }
});

db.run(createSeries, (err)=> {
  if (err) {
    console.log(err);
  }
});

db.run(createIssue, (err)=> {
  if (err) {
    console.log(err);
  }
});
