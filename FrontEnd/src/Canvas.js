import React, { useState, useRef, useEffect} from 'react';
import { Stage, Layer, Rect, Transformer, Image } from 'react-konva';
import { useImage } from 'react-konva-utils';

function Canvas({ annotations, setAnnotations, scale, imageURL, selectedTool, onTransform, onSelectAnnotation, selectedRectId, setSelectedRectId, onTransformAnnotation, onAddAnnotation }) {
  const transformerRef = useRef();
  const stageRef = useRef();
  const [konvaImage] = useImage(imageURL);
  const [newRect, setNewRect] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  
  
  const handleMouseDown = (e) => {
    if (selectedTool !== 'draw') return;
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setNewRect({ x: pos.x, y: pos.y, width: 0, height: 0, id: `rect_${Date.now()}` });
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    setNewRect((prevRect) => ({
      ...prevRect,
      width: point.x - prevRect.x,
      height: point.y - prevRect.y,
    }));
  };

  const handleMouseUp = () => {
    // Finalize drawing
    if (newRect) {
      setAnnotations((prevAnnotations) => [...prevAnnotations, newRect]);
      setNewRect(null); // Reset temporary rectangle
      setIsDrawing(false); // Stop drawing
    }
  };

  useEffect(() => {
    // Ensure the transformer attaches to the selected rectangle
    if (transformerRef.current) {
      const stage = transformerRef.current.getStage();
      const selectedNode = stage.findOne(`#${selectedRectId}`);
      transformerRef.current.nodes(selectedNode ? [selectedNode] : []);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedRectId]);

  // useEffect(() => {
  //   if (transformerRef.current && onSelectAnnotation) {
  //     const selected = annotations.find(a => a.isSelected);
  //     if (selected) {
  //       transformerRef.current.nodes([selected.ref.current]);
  //       transformerRef.current.getLayer().batchDraw();
  //     } else {
  //       transformerRef.current.nodes([]);
  //     }
  //   }
  // }, [annotations, onSelectAnnotation]);

  return (
  <div style={{ border: '1px solid #ddd', margin: '20px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
      <Stage ref={stageRef} width={window.innerWidth - 240} height={window.innerHeight - 40} onMouseDown={handleMouseDown} onMousemove={handleMouseMove} onMouseup={handleMouseUp}>
        <Layer>
          {konvaImage && (
            <Image
              image={konvaImage}
              scaleX={scale}
              scaleY={scale}
              x={(stageRef.current ? stageRef.current.width() / 2 : window.innerWidth / 2) - (konvaImage.width / 2) * scale}
              y={(stageRef.current ? stageRef.current.height() / 2 : window.innerHeight / 2) - (konvaImage.height / 2) * scale}
            />
          )}
          {annotations.map((annotation) => (
            <Rect
              key={annotation.id}
              {...annotation}
              id={annotation.id}
              draggable
               onClick={() => setSelectedRectId(annotation.id)} // Update selected ID on click
              stroke={selectedRectId === annotation.id ? 'red' : 'black'} // Highlight if selected
              strokeWidth={selectedRectId === annotation.id ? 4 : 2} // Thicker border if selected
              onDragEnd={(e) => onTransformAnnotation(annotation.id, e)}
              // onClick={(e) => {
              //   // If the click is on the stage (background), clear the selection
              //   if (e.target === e.target.getStage()) {
              //     setSelectedRectId(null);
              //   }
              // }}
              // // stroke="black"
              onTransformEnd={(e) => {
              const node = e.target;
              const scaleX = node.scaleX();
              const scaleY = node.scaleY();
              const rotation = node.rotation();
              const x = node.x();
              const y = node.y();
      // Call onTransform using annotation.id instead of index
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
    </div>
  );
}

export default Canvas;
