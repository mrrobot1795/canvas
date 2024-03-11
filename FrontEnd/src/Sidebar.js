import React from 'react';
import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import { Select, MenuItem } from '@mui/material';
import { Button, TextField } from '@mui/material';

function Sidebar({ templates, uploadedImage, annotations, onSelectTemplate, onSaveTemplate, onDeleteTemplate, onSelectAnnotation,onSelectItem, onDeleteSelectedItem }) {
  const [templateName, setTemplateName] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  
  const handleTemplateSelectionChange = (event) => {
    const templateId = event.target.value;
    console.log("Selected template ID:", templateId)
    onSelectTemplate(templateId);
  };

  const handleDeleteClick = (event, templateId) => {
    event.stopPropagation();
    onDeleteTemplate(templateId);
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    if (value === "image") {
      onSelectItem({ type: "image" }); // Assuming onSelectItem expects an object
    } else if (value.startsWith('rect_')) {
      const rectIndex = parseInt(value.split('_')[1], 10);
      onSelectItem({ type: "rectangle", index: rectIndex });
    }
  };

  const handleSaveClick = () => {
    if (templateName) {
      onSaveTemplate(templateName);
      setTemplateName(''); // Reset template name input after saving
    } else {
      alert('Please provide a name for the template.');
    }
  };

  return (
    <Paper elevation={2} sx={{
      width: '200px',
      height: '100vh',
      overflow: 'auto',
      backgroundColor: '#aaaaaa',
      borderRight: '1px solid #eee',
      padding: '16px', // Added padding for inner content
    }}>
      {(uploadedImage || annotations.length > 0) && (
        <>
          <Select
            fullWidth
            value=""
            onChange={handleSelectChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{ mb: 2 }}
          >
            <MenuItem value="" disabled>Canvas</MenuItem>
            {uploadedImage && <MenuItem value="image">Uploaded Image</MenuItem>}
            {annotations.map((_, index) => (
              <MenuItem key={`rect_${index}`} value={`rect_${index}`}>Rectangle {index + 1}</MenuItem>
            ))}
          </Select>
          <IconButton
            onClick={onDeleteSelectedItem}
            size="large"
            sx={{ mb: 2 }}
            aria-label="delete selected item"
          >
            <DeleteIcon />
          </IconButton>
          <TextField
            label="Template Name"
            variant="outlined"
            size="small"
            fullWidth
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            sx={{ mb: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSaveClick}
          >
            Save Template
          </Button>
        </>
      )}
      <List sx={{ mt: 2 }}> {/* Added margin top for separation */}
        {templates.map((template, index) => (
          <ListItem
            key={template.id}
            value={template.id}
            button
            onClick={() => onSelectTemplate(template)}
            sx={{
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ListItemText primary={`Template ${index + 1}`} />
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={(event) => handleDeleteClick(event, template.id)}
              size="large"
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <List sx={{ mt: 10 }}>
      <Select
        value={selectedTemplateId}
        onChange={handleTemplateSelectionChange}
        displayEmpty
        fullWidth
      >
        <MenuItem value="">
          <em>Saved Templates</em>
        </MenuItem>
        {templates.map((template) => (
          <MenuItem key={template.id} value={template.id}>
            {template.name}
          </MenuItem>
        ))}
      </Select>
      {/* Display selected template details here */}
      </List>
    </Paper>  
  );
}


export default Sidebar;