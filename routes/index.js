const express = require('express');
const router = express.Router();
const musicController = require('./controllers/music.controller');

router.post('/mixEditor', musicController.createMusic);

module.exports = router;
