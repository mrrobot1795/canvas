const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const templateSchema = new Schema({
  name: {
    type: String,
    required: true, // Ensures every template has a name
    trim: true, // Removes leading and trailing whitespace
  },
  image: {
    type: String,
    required: false, // Make it required if every template must be linked to an image
    // You can add validation to ensure it's a URL if you're storing image URLs
  },
  rectangles: [{
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    rotation: { type: Number, required: true },
  }],
}, {
  timestamps: true, // Adds createdAt and updatedAt fields automatically
});

const Template = mongoose.model('Template', templateSchema);

module.exports = Template;
