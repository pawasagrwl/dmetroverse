// ImageModal.tsx
import React from 'react';
import { Box, Modal, IconButton, CardMedia } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ImageModalProps {
  open: boolean;
  onClose: () => void;
  imgSrc: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ open, onClose, imgSrc }) => (
  <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Box sx={{ position: 'relative', outline: 'none' }}>
      <IconButton
        onClick={onClose}
        sx={{ position: 'absolute', right: 8, top: 8, color: 'black', zIndex: 2 }}
      >
        <CloseIcon />
      </IconButton>
      <CardMedia
        component="img"
        image={imgSrc}
        alt="Selected image"
        sx={{ maxHeight: '90vh', maxWidth: '90vw', boxShadow: 3 }}
      />
    </Box>
  </Modal>
);

export default ImageModal;
