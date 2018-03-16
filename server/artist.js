const artistRouter = require('express').Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE ||
                                './database.sqlite');

module.exports = artistRouter;

artistRouter.param('artistId', (req, res, next, id) => {
  const artistId = Number(id);
  const statement = "select * from Artist where id=$id";
  const values = {$id : artistId};
  db.get(statement, values, (err, row)=>{
          if (err) {
            next(err);
          } else if (row) {
            req.artist = row;
            next();
          } else {
            res.sendStatus(404);
          }
        });
});

artistRouter.get('/', (req, res, next) => {
  statement="select * from Artist where is_currently_employed = 1";
  db.all(statement, (err, rows) => {
          if (err) {
            res.sendStatus(400);
          } else {
            res.status(200).send({artists:rows});
          }
        });
});

artistRouter.post('/', (req, res, next) => {
  const newArtist = req.body.artist;
  const statement = "insert into Artist (name, date_of_birth, biography) \
                    values ($name, $date_of_birth, $biography)";
  const values = {$name: newArtist.name,
                  $date_of_birth: newArtist.dateOfBirth,
                  $biography: newArtist.biography };
  if (!newArtist.name || !newArtist.dateOfBirth || !newArtist.biography) {
    res.sendStatus(400);
  }
  db.run(statement, values, function(err) {
    if (err) {
      next(err);
    } else {
      db.get("select * from Artist where id = $id", {$id:this.lastID},
        (err, row)=> {
          res.status(201).send({artist:row});
      });
    }
  });
});

artistRouter.get('/:artistId', (req, res, next) => {
  res.status(200).send({artist:req.artist});
});

artistRouter.put('/:artistId', (req, res, next) => {
  const statement = "update Artist set name=$name, date_of_birth = $date_of_birth, biography = $biography, is_currently_employed = $is_currently_employed where id = $id";
  const updatedArtist = req.body.artist;
  const values = {$id: req.artist.id,
                  $name: updatedArtist.name,
                  $date_of_birth: updatedArtist.dateOfBirth,
                  $biography: updatedArtist.biography,
                  $is_currently_employed: updatedArtist.isCurrentlyEmployed};
  if (!req.artist.id||
      !updatedArtist.name||
      !updatedArtist.dateOfBirth||
      !updatedArtist.biography) {
    res.sendStatus(400);
  }

  db.run(statement, values, function(err) {
     if (err) {
       next(err);
     }
     db.get("SELECT * FROM Artist WHERE id=$id",{$id:req.artist.id},
          (err, row)=> {
            if (err) {
              next(err);
            }
            res.status(200).send({artist:row});
          });
   }
 )
});

artistRouter.delete('/:artistId', (req, res, next) => {
  const statement="UPDATE Artist SET is_currently_employed = 0 where id=$id";
  const values = {$id : req.artist.id};

  db.run(statement, values,
    function(err){
      if (err) {
        next(err);
      } else {
        console.log("req.artist.id: " + req.artist.id);
        console.log("req.params.id: " + req.params.id);
        console.log(`select * From Artist where id = ${req.artist.id}`);
        db.run("select * from Artist where id = $id", {$id:req.artist.id},
          (err, row)=> {
            if (err) {
              console.log("there was an error");
              next(err)
            }
            console.log(row);
            res.status(200).send({artist : row});
        });
      }
    });
});
