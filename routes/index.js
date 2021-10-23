const express = require('express');
const router = express.Router();
const musicController = require('./controllers/music.controller');

router.post('/mixEditor', musicController.createMusic);
router.get('/mixEditor/instrument', musicController.getInstrumentData);
router.get('/mixEditor/music/:musicId', musicController.getMusicData);
router.put('/mixEditor/music/:musicId', musicController.updateMusic);

module.exports = router;
