import React from 'react';
import IconButton from '@mui/material/IconButton';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

function ImageTools({ onZoomIn, onZoomOut }) {
  return (
    <Box sx={{
      position: 'absolute',
      bottom: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      borderRadius: '16px', // Rounded corners
      overflow: 'hidden', // Ensures the Paper elevation shadow is contained within the border radius
    }}>
      <Paper elevation={3} sx={{ display: 'flex', backgroundColor: '#aaaaaa' }}>
        <Tooltip title="Zoom In">
          <IconButton 
            onClick={onZoomIn} 
            size="large" 
            sx={{ 
              borderRadius: 0,
              backgroundColor: '#666666', // Dark grey background for the button
              '&:hover': {
                backgroundColor: '#555555', // Slightly darker on hover
              }
            }}>
            <ZoomInIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Zoom Out">
          <IconButton 
            onClick={onZoomOut} 
            size="large" 
            sx={{ 
              borderRadius: 0,
              backgroundColor: '#666666', // Dark grey background for the button
              '&:hover': {
                backgroundColor: '#555555', // Slightly darker on hover
              }
            }}>
            <ZoomOutIcon />
          </IconButton>
        </Tooltip>
      </Paper>
    </Box>
  );
}

export default ImageTools;
