// PostMediaViewer.tsx
import React, { useState } from 'react';
import { Box, CardMedia, IconButton } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import ImageModal from './ImageModal'; // Adjust the import path as necessary

interface PostMediaViewerProps {
  images: string[];
}

const PostMediaViewer: React.FC<PostMediaViewerProps> = ({ images }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState('');

  const handleNext = () => setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, images.length - 1));
  const handleBack = () => setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  const handleOpenModal = (imgUrl: string) => {
    setOpenModal(true);
    setSelectedImg(imgUrl);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: 500 }}>
      <SwipeableViews
        index={activeStep}
        onChangeIndex={(index) => setActiveStep(index)}
        enableMouseEvents
      >
        {images.map((imgUrl, index) => (
          <Box key={index} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CardMedia
              component="img"
              image={imgUrl}
              alt={`Gallery image ${index + 1}`}
              onClick={() => handleOpenModal(imgUrl)}
              sx={{ height: '100%', cursor: 'pointer' }}
            />
          </Box>
        ))}
      </SwipeableViews>
      <IconButton
        onClick={handleBack}
        disabled={activeStep === 0}
        sx={{
          position: 'absolute',
          left: 16,
          top: 'calc(50% - 20px)',
          color: 'white',
          zIndex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.7)', // Darker on hover
          },
          // Increase the size of the buttons
          height: 48,
          width: 48,
        }}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNext}
        disabled={activeStep === images.length - 1}
        sx={{
          position: 'absolute',
          right: 16,
          top: 'calc(50% - 20px)',
          color: 'white',
          zIndex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.7)', // Darker on hover
          },
          // Increase the size of the buttons
          height: 48,
          width: 48,
        }}
      >
        <KeyboardArrowRight />
      </IconButton>
      <ImageModal open={openModal} onClose={() => setOpenModal(false)} imgSrc={selectedImg} />
    </Box>
  );
};

export default PostMediaViewer;
