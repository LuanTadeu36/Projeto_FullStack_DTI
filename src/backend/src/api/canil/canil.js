const restful = require('node-restful');
const mongoose = restful.mongoose;

const todoSchema = new mongoose.Schema({
    data: { type: String, required: true },
    cachorroPequeno: { type: Number, required: true },
    cachorroGrande: { type: Number, required: true }
});

module.exports = restful.model('Tdi', todoSchema);
