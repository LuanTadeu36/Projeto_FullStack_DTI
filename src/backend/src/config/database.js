const mongoose = require("mongoose");
 mongoose.Promise = global.Promise; module.exports = mongoose.connect(
"mongodb://localhost:27017/tdi",
 {     useMongoClient: true,     useNewUrlParser: true,     useUnifiedTopology: true, });