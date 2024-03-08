import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import Toolbar from './Toolbar';
import ImageTools from './ImageTools';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [templates, setTemplates] = useState([]); 
  const [annotations, setAnnotations] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [scale, setScale] = useState(1); 
  const [imageURL, setImageURL] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedRectId, setSelectedRectId] = useState(null);

  const onSaveTemplate = async (templateName) => {
    const templateData = {
      name: templateName,
      image: imageURL,
      rectangles: annotations,
    };

    try {
      const response = await fetch('/Backend/models/template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(templateData),
      });
      if (!response.ok) throw new Error('Failed to save the template.');
      alert('Template saved successfully!');
    } catch (error) {
      console.error('Error saving the template:', error);
      alert('Error saving the template.');
    }
  };
  
  
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageURL(url);
    }
  };

  const handleSelectItem = (selection) => {
    setSelectedItem(selection);
  };

  const handleDeleteSelectedItem = () => {
    if (!selectedItem) return;

    if (selectedItem.type === "image") {
      setImageURL(null); // Clear the uploaded image URL
      setSelectedItem(null); // Reset selection
    } else if (selectedItem.type === "rectangle") {
      // Remove the selected rectangle by index
      const newAnnotations = annotations.filter((_, index) => index !== selectedItem.index);
      setAnnotations(newAnnotations);
      setSelectedItem(null); // Reset selection
    }
  };

  const addAnnotation = (newAnnotation) => {
    const id = uuidv4(); // Generates a unique UUID
    const annotatedRectangle = { ...newAnnotation, id: id };
    setAnnotations(prev => [...prev, annotatedRectangle]);
  };

  const onTransform = (id, { x, y, rotation, scaleX, scaleY }) => {
    setAnnotations(annotations.map(annotation => {
      if (annotation.id === id) {
        return { ...annotation, x, y, rotation, scaleX, scaleY };
      }
      return annotation;
    }));
  };

  const handleSelectTemplate = (template) => {
    setAnnotations(template.annotations || []);
  };

  const handleDeleteTemplate = (templateId) => {
    setTemplates(templates.filter(template => template.id !== templateId));
  };

  const handleToolSelect = (tool) => {
    setSelectedTool(tool);
  };

  const handleZoomIn = () => {
    setScale(scale * 1.1);
  };

  const handleZoomOut = () => {
    setScale(Math.max(0, scale / 1.1));
  };



  const selectAnnotation = (selectedAnnotation) => {
    setAnnotations(annotations.map(annotation => {
      if (annotation.id === selectedAnnotation.id) {
        return { ...selectedAnnotation, isSelected: true };
      } else {
        return { ...annotation, isSelected: false };
      }
    }));
  };
  const onTransformAnnotation = (id, newProps) =>{
    const updatedAnnotations = annotations.map((annotation) => {
      if (annotation.id === id) {
        return { ...annotation, ...newProps };
      }
      return annotation;
    });
  
    setAnnotations(updatedAnnotations);
  };

  const onUndo = () => {
    setHistory((currentHistory) => {
      const previousAnnotations = currentHistory.pop() || [];
      setAnnotations(previousAnnotations);
      return [...currentHistory];
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Sidebar templates={templates} onSelectTemplate={handleSelectTemplate} onDeleteTemplate={handleDeleteTemplate} uploadedImage={imageURL} annotations={annotations} onSelectItem={handleSelectItem} onDeleteSelectedItem={handleDeleteSelectedItem} onSaveTemplate={onSaveTemplate}/>
      <div style={{ flexGrow: 1 }}>
        <Canvas
          annotations={annotations}
          setAnnotations={setAnnotations}
          scale={scale}
          onAddAnnotation={addAnnotation}
          selectedTool={selectedTool}
          onSelectAnnotation={selectAnnotation}
          onTransformAnnotation={onTransformAnnotation}
          imageURL={imageURL}
          onZoomIn={handleZoomIn} 
          onZoomOut={handleZoomOut}
          onTransform={onTransform}
          selectedRectId={selectedRectId}
        />
        <Toolbar onToolSelect={handleToolSelect} onImageUpload={handleImageUpload} onUndo={onUndo}/>
        <ImageTools onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
      </div>
    </div>
  );
}

export default App;
