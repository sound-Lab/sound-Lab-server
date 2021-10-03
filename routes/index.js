const express = require('express');
const router = express.Router();
const musicController = require('./controllers/music.controller');

router.post('/mixEditor', musicController.createMusic);
router.get('/mixEditor/:musicId', musicController.getMusicData);

module.exports = router;
