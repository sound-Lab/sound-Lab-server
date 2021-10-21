require('dotenv').config();

module.exports = {
  databaseURL: process.env.MONGO_DB_URL,
  corsOption: {
    origin: '*',
    optionsSuccessStatus: 200,
  },
};
