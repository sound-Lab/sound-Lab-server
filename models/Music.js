const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  title: {
    type: String,
    isRequired: true,
  },
});

module.exports = mongoose.model('Music', musicSchema);
