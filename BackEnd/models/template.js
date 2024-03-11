const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const templateSchema = new Schema({
  name: {
    type: String,
    required: true, 
    trim: true,
    unique: true, 
  },
  image: {
    type: String,
    required: false, 
  },
  rectangles: [{
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    rotation: { type: Number, required: false },
  }],
}, {
  timestamps: true, 
});

const Template = mongoose.model('Template', templateSchema);

module.exports = Template;
