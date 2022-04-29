const { MongoClient } = require('mongodb');

require('dotenv').config();

const MONGO_DB_URL = `mongodb://${process.env.HOST || 'mongodb'}:27017/StoreManager`;
const DB_NAME = 'StoreManager';
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let conn = null;

module.exports = async () => {
  try {
    return conn
      ? Promise.resolve(conn)
      : MongoClient.connect(MONGO_DB_URL, OPTIONS)
        .then((con) => {
          conn = con.db(DB_NAME);
          return conn;
        });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
