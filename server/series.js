const seriesRouter = require('express').Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE ||
                                './database.sqlite');

module.exports = seriesRouter;



seriesRouter.get('/api/series', (req, res, next) => {
});
seriesRouter.post('/api/series', (req, res, next) => {});

seriesRouter.get('/api/series/:seriesId', (req, res, next) => {});
seriesRouter.put('/api/series/:seriesId', (req, res, next) => {});
seriesRouter.delete('/api/series/:seriesId', (req, res, next) => {});

seriesRouter.get('/api/series/:seriesId/issues', (req, res, next) => {});
seriesRouter.post('/api/series/:seriesId/issues', (req, res, next) => {});

seriesRouter.put('/api/series/:seriesId/issues/:issueId', (req, res, next) => {});
seriesRouter.delete('api/series/:seriesId/issues/:issueId', (req, res, next) => {});
