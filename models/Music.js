const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  title: {
    type: String,
    isRequired: true,
  },
  bpm: {
    type: String,
  },
  isPlaying: {
    type: Boolean,
  },
  tracks: [
    {
      instrument: {
        type: String,
      },
      track: [],
    },
  ],
});

module.exports = mongoose.model('Music', musicSchema);
