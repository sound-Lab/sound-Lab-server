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
      name: {
        type: String,
      },
      codeName: [],
      bars: [],
      steps: [],
    },
  ],
});

module.exports = mongoose.model('Music', musicSchema);
