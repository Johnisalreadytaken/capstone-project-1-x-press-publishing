const artistRouter = require('express').Router();

module.exports = artistRouter;

artistRouter.param('artistId', (id, req, res, next) => {
  //const artist =
}

artistRouter.get('/', (req, res, next) => {

});
artistRouter.post('/', (req, res, next) => {});

artistRouter.get('/:artistId', (req, res, next) => {});
artistRouter.put('/:artistId', (req, res, next) => {});
artistRouter.delete('/:artistId', (req, res, next) => {});
