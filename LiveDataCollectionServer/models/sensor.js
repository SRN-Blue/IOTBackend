const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sensorSchema = new Schema({
  deviceId: {
    type: String,
    required: true,
  },
  sensorLiveData: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Sesnos", sensorSchema);
