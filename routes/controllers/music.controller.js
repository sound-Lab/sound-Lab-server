const mongoose = require('mongoose');

const Music = require('../../models/Music');
const { DefaultError, ExistingDataError } = require('../../lib/errors');

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
