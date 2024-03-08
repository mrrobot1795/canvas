import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import ImageIcon from '@mui/icons-material/Image';
import PanToolIcon from '@mui/icons-material/PanTool';
import AddBoxIcon from '@mui/icons-material/AddBox';
import UndoIcon from '@mui/icons-material/Undo';
import Box from '@mui/material/Box';

function Toolbar({ onToolSelect, onImageUpload, onUndo }) {
  // Ref for the hidden file input
  const fileInputRef = React.useRef(null);

  const handleImageIconClick = () => {
    // Trigger the file input when the image icon is clicked
    fileInputRef.current.click();
  };

  return (
    <Box sx={{
      position: 'absolute',
      top: 10,
      left: '50%',
      transform: 'translateX(-50%)', 
      display: 'flex', 
      gap: 1, 
      backgroundColor: '#aaaaaa', 
      borderRadius: 1, 
      boxShadow: 3, 
      p: 1, 
    }}>
      <IconButton onClick={() => onToolSelect('draw')} size="large" color="primary">
        <CropSquareIcon />
      </IconButton>
      <IconButton onClick={handleImageIconClick} size="large" color="primary">
        <ImageIcon />
      </IconButton>
      {/* Hidden file input for image upload */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={onImageUpload}
        accept="image/*"
      />
      <IconButton onClick={() => onToolSelect('select')} size="large" color="primary">
        <PanToolIcon />
      </IconButton>
      <IconButton onClick={() => onToolSelect('createRect')} size="large" color="primary">
        <AddBoxIcon /> {/* New button for creating rectangles */}
      </IconButton>
      <IconButton onClick={onUndo} size="large" color="primary">
        <UndoIcon />
      </IconButton>

      {/* Add more tools as needed */}
    </Box>
  );
}

export default Toolbar;
