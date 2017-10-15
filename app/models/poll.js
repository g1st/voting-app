const mongoose = require('mongoose');

const { Schema } = mongoose;

const pollSchema = new Schema({
  creator: String, // username
  title: String,
  votedIPs: Array,
  data: [{
    label: String,
    count: {
      type: Number,
      default: 0,
    },
    _id: false,
  }],
});

module.exports = mongoose.model('Poll', pollSchema);
