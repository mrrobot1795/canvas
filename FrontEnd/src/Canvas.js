import React, { useState, useRef, useEffect} from 'react';
import { Stage, Layer, Rect, Transformer, Image } from 'react-konva';
import { useImage } from 'react-konva-utils';

function Canvas({ annotations, setAnnotations, scale, imageURL, selectedTool, onTransform, onSelectAnnotation, selectedRectId, setSelectedRectId, onTransformAnnotation, onAddAnnotation }) {
  const transformerRef = useRef();
  const stageRef = useRef();
  const [konvaImage] = useImage(imageURL);
  const [selectedId, setSelectedId] = useState(null);
  const [newRect, setNewRect] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [imageRotation, setImageRotation] = useState(0);
  
  
  useEffect(() => {
    if (selectedId && transformerRef.current) {
      const nodes = annotations.filter(a => a.id === selectedId).map(a => a.ref.current);
      transformerRef.current.nodes(nodes.length > 0 ? [nodes[0]] : []);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedId, annotations]);

  const handleRotationChange = (e) => {
    setImageRotation(e.target.value);
  };

  const handleMouseDown = (e) => {
    if (selectedTool !== 'draw') return;
  
    
    if (!isDrawing) {
      setIsDrawing(true); 
      const pos = e.target.getStage().getPointerPosition();
      const newRect = {
        x: pos.x,
        y: pos.y,
        width: 0,
        height: 0,
        id: `rect_${Date.now()}`,
        ref: React.createRef(),
      };
      setAnnotations((prev) => [...prev, newRect]);
    } else {
      
      setIsDrawing(false); 
      
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
  
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    setAnnotations((prev) =>
      prev.map((rect, index) =>
        index === prev.length - 1 
          ? { ...rect, width: point.x - rect.x, height: point.y - rect.y }
          : rect
      )
    );
  };
  


  const handleMouseUp = () => {
    // Finalize drawing
    if (newRect) {
      setAnnotations((prevAnnotations) => [...prevAnnotations, newRect]);
      setNewRect(null); 
    }
  };

  useEffect(() => {
    if (!transformerRef.current) return;
  
    
    const selectedRect = stageRef.current.findOne(`#${selectedRectId}`);
    
    if (selectedRect) {
      transformerRef.current.nodes([selectedRect]);
    } else {
      transformerRef.current.nodes([]);
    }
  
    transformerRef.current.getLayer().batchDraw();
  }, [selectedRectId, annotations]);
  


  return (
  <div style={{ border: '1px solid #ddd', margin: '20px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
      <Stage ref={stageRef} width={window.innerWidth - 240} height={window.innerHeight - 40} onMouseDown={handleMouseDown} onMousemove={handleMouseMove} onMouseup={handleMouseUp}>
        <Layer>
          {konvaImage && (
            <Image
              image={konvaImage}
              scaleX={scale}
              scaleY={scale}
              x={(stageRef.current ? stageRef.current.width()  /2 : window.innerWidth / 2) - (konvaImage.width / 2) * scale}
              y={(stageRef.current ? stageRef.current.height() / 2 : window.innerHeight / 2) - (konvaImage.height / 2) * scale}
              
              rotation={imageRotation}
            />
          )}
          {annotations.map((annotation) => (
            <Rect
              key={annotation.id}
              {...annotation}
              id={annotation.id}
              draggable
               onClick={() => setSelectedRectId(annotation.id)} 
              stroke={selectedRectId === annotation.id ? 'blue' : 'black'} 
              strokeWidth={selectedRectId === annotation.id ? 4 : 2} 
              onDragEnd={(e) => onTransformAnnotation(annotation.id, e)}
              onTransformEnd={(e) => {
              const node = e.target;
              const scaleX = node.scaleX();
              const scaleY = node.scaleY();
              const rotation = node.rotation();
              const x = node.x();
              const y = node.y();
              onTransform(annotation.id, { x, y, rotation, scaleX, scaleY });
              }}
            />
          ))}
          {newRect && (
            <Rect
            {...newRect}
              fill="transparent"
              stroke="black"
              strokeWidth={1}
            />
          )}
          <Transformer ref={transformerRef} />
        </Layer>
      </Stage>
      <div style={{ marginTop: '20px' }}>
      <input
        type="range"
        min="-180"
        max="180"
        value={imageRotation}
        onChange={handleRotationChange}
      />
    </div>
    </div>
  );
}

export default Canvas;
