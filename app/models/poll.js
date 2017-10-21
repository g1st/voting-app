const mongoose = require('mongoose');

const { Schema } = mongoose;

const pollSchema = new Schema({
  creator: String, // username
  title: String,
  votedIPs: Array,
  data: [{
    label: {
      type: String,
      trim: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  }],
});

module.exports = mongoose.model('Poll', pollSchema);
