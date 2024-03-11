const express = require('express');
const router = express.Router();
const Template = require('../models/template');


const app = express();
app.use(express.json());
// Create a new template
router.post('/', async (req, res) => {
  const { name } = req.body;
  
  try {
    const existingTemplate = await Template.findOne({ name });

    if (existingTemplate) {
      return res.status(400).json({ message: 'A template with this name already exists.' });
    }

    const template = new Template(req.body);
    const savedTemplate = await template.save();

    const transformedTemplate = {
      ...savedTemplate.toObject(),
      id: savedTemplate._id.toString(),
    };

    res.status(201).json(transformedTemplate);
    console.log("Received data:", req.body);
  } catch (err) {
    console.error("Error saving template:", err);
    res.status(400).json({ message: err.message });
  }
});

// Get all templates
router.get('/', async (req, res) => {
  try {
    const templates = await Template.find();
    const transformedTemplates = templates.map(template => ({
      ...template.toObject(),
      id: template._id.toString(),
  }));
    res.json(transformedTemplates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single template by id
router.get('/:id', async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) return res.status(404).json({ message: 'Template not found' });
    const transformedTemplate = {
      ...template.toObject(),
      id: template._id.toString(),
  };
    res.json(transformedTemplate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a template
router.put('/:id', async (req, res) => {
  try {
    const updatedTemplate = await Template.findByIdAndUpdate(req.params.id, req.body, { new: true });
    const transformedTemplate = {
      ...updatedTemplate.toObject(),
      id: updatedTemplate._id.toString(),
  };
  res.json(transformedTemplate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a template
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTemplate = await Template.findByIdAndDelete(id);

    if (!deletedTemplate) {
      return res.status(404).send({ message: 'Template not found' });
    }

    res.send({ message: 'Template deleted successfully' });
  } catch (err) {
    console.error('Error deleting template:', err);
    res.status(500).send({ message: 'Failed to delete the template' });
  }
});

module.exports = router;
