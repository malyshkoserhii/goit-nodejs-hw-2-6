const mongoose = require('mongoose');
require('dotenv').config();
const uriDb = process.env.URI_DB;

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on('connected', () => {
  console.log('Moongose connection to the Data base');
});

mongoose.connection.on('error', (error) => {
  console.log(`Moongose connection error: ${error.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Moongose disconnected');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Connection for the Data base closed and app termination');
  process.exit(1);
});

module.exports = db;
