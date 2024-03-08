const express = require('express');
const router = express.Router();
const Template = require('../models/template'); // Ensure this path matches the location of your template model file

// Create a new template
router.post('/', async (req, res) => {
  const template = new Template(req.body);
  try {
    const savedTemplate = await template.save();
    res.status(201).json(savedTemplate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all templates
router.get('/', async (req, res) => {
  try {
    const templates = await Template.find();
    res.json(templates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single template by id
router.get('/:id', async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) return res.status(404).json({ message: 'Template not found' });
    res.json(template);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a template
router.put('/:id', async (req, res) => {
  try {
    const updatedTemplate = await Template.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTemplate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a template
router.delete('/:id', async (req, res) => {
  try {
    const template = await Template.findByIdAndDelete(req.params.id);
    if (!template) return res.status(404).json({ message: 'Template not found' });
    res.json({ message: 'Template deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
