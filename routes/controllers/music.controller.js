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
    const { title } = req.body;

    if (await Music.exists({ title })) {
      return next(new ExistingDataError());
    }

    const newMusic = await Music.create({
      title,
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
    const { tool } = req.params;
    const soundList = await Instrument.findOne({ name: tool });

    if (!soundList) {
      return next(new NotFoundError());
    }

    const { name, sound } = soundList;
    const codes = sound.map((sound) => sound.code);
    const samplerList = {};
    sound.forEach(({ sound: { code, url } }) => {
      samplerList[code] = url;
    });
    const result = {};

    result[name] = { codes, samplerList };

    res.json(result);
  } catch (err) {
    next(new DefaultError());
  }
};
