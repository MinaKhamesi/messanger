const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    if (process.env.NODE_ENV !== 'test') {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
      console.log('mongoDb connected...'.bgCyan.black);
    }
  } catch (error) {
    console.log(error);
    process.exit('1');
  }
};

module.exports = connectDb;
