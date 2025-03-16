// PostBody.js
import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import he from 'he';
import parse from 'html-react-parser';
import GalleryViewer from './PostMediaViewer'; // Adjust the import path as necessary
import { PostBodyProps } from '../../../../common/types';
const PostBody: React.FC<PostBodyProps> = ({ body, imageUrl, gallery, videoUrl }) => {  let decodedBody = body ? he.decode(body) : "No text";
  if (decodedBody.length > 400) {
    decodedBody = `${decodedBody.substring(0, 388)}...(read more)`;
  }
  const htmlBody = parse(decodedBody);

  return (
    <>
      <Typography variant="body1" color="text.primary" gutterBottom>
        {htmlBody}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {imageUrl && !gallery && <img src={imageUrl} alt="" style={{ width: '100%', height: 'auto' }} />}
          {gallery && gallery.length > 0 && <GalleryViewer images={gallery} />}
          {videoUrl && (
            <Box component="video" controls sx={{ width: '100%' }}>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default PostBody;
