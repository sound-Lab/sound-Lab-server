const mongoose = require('mongoose');

const Music = require('../../models/Music');

exports.createMusic = async (req, res, next) => {
  try {
    const { title } = req.body;

    if (await Music.exists({ title })) {
      return next('err');
    }

    const newMusic = await Music.create({
      title,
    });

    res.json({
      result: 'ok',
      data: newMusic,
    });
  } catch (err) {
    next(err);
  }
};
