const mongoose = require('mongoose');

let dbMode = 'json';

const setDbMode = (mode) => {
  dbMode = mode;
};

const getDbMode = () => dbMode;

const tryConnect = async (name, uri, opts = {}) => {
  try {
    console.log(`🔌 Attempt: ${name}...`);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: opts.timeout || 10000,
      connectTimeoutMS: opts.timeout || 10000,
      socketTimeoutMS: (opts.timeout || 10000) + 5000,
    });
    console.log(`✅ MongoDB Connected! via: ${name}`);
    console.log(`   Host: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
    setDbMode('mongodb');
    return true;
  } catch (error) {
    const shortMsg =
      error.message && error.message.split('\n')[0]
        ? error.message.split('\n')[0]
        : String(error);
    console.log(`   ❌ Failed: ${shortMsg}`);
    try {
      await mongoose.disconnect();
    } catch (e) {}
    return false;
  }
};

const connectDB = async () => {
  const ok = await tryConnect(
    'MongoDB Atlas (faizan2:Faizan@123)',
    process.env.MONGO_URI,
    { timeout: 8000 }
  );
  if (ok) return true;

  const okLocal = await tryConnect(
    'Local MongoDB (localhost:27017)',
    'mongodb://localhost:27017/merncrud',
    { timeout: 4000 }
  );
  if (okLocal) return true;

  console.log('🔄 Falling back to File-based JSON database (data/db.json)');
  setDbMode('json');
  return false;
};

module.exports = { connectDB, getDbMode, setDbMode };
