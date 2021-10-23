const mongoose = require('mongoose');

const Music = require('../../models/Music');
const Instrument = require('../../models/Instrument');

const {
  DefaultError,
  NotFoundError,
  ExistingDataError,
} = require('../../lib/errors');

exports.createMusic = async (req, res, next) => {
  try {
    const { title, initialTracks } = req.body;

    if (await Music.exists({ title })) {
      return next(new ExistingDataError());
    }

    const newMusic = await Music.create({
      title,
      tracks: initialTracks,
    });

    res.json({
      result: 'ok',
      data: newMusic,
    });
  } catch (err) {
    next(new DefaultError());
  }
};

exports.getMusicData = async (req, res, next) => {
  try {
    const { musicId } = req.params;
    const musicData = await Music.findById(musicId);

    if (!musicData) {
      return next(new NotFoundError());
    }

    res.json({
      result: 'ok',
      data: musicData,
    });
  } catch (err) {
    next(new DefaultError());
  }
};

exports.getInstrumentData = async (req, res, next) => {
  try {
    const soundList = await Instrument.find().lean().exec();

    if (!soundList) {
      return next(new NotFoundError());
    }

    const sampleSound = soundList.map((instrument) => {
      const { name, sound } = instrument;

      const codes = sound.map((sound) => sound.code);
      const samplerList = {};

      sound.forEach((sound) => {
        const { code, url } = sound;
        samplerList[code] = url;
      });

      const result = {};

      return (result[name] = { name, codes, samplerList });
    });

    res.json({
      result: 'ok',
      data: sampleSound,
    });
  } catch (err) {
    next(new DefaultError());
  }
};

exports.updateMusic = async (req, res, next) => {
  try {
    const { musicId } = req.params;
    const { tracks } = req.body;
    const targetMusic = await Music.findById(musicId);

    if (!targetMusic) {
      return next(new NotFoundError());
    }

    targetMusic.tracks = tracks;

    await targetMusic.save(tracks);

    res.json({
      result: 'ok',
    });
  } catch (err) {
    next(new DefaultError());
  }
};
