import React from 'react';
import he from 'he';
import parse from 'html-react-parser';
import { Box, Typography, Link, Stack, CardMedia, Grid } from '@mui/material';
import { format } from 'date-fns';
import { RedditPostProps } from '../common/types';

const RedditPost: React.FC<RedditPostProps> = ({
  title,
  body,
  url,
  username,
  votes,
  createdUtc,
  imageUrl,
  gallery,
  videoUrl,
}) => {
  const decodedTitle = he.decode(title);
  let decodedBody = body ? he.decode(body) : "No text";
  if (decodedBody.length > 400) {
    decodedBody = `${decodedBody.substring(0, 388)}...(read more)`;
  }
  const htmlBody = parse(decodedBody);
  const postDate = format(new Date(createdUtc * 1000), 'PPPpp');

  const renderMedia = () => {
    if (imageUrl) {
      return <CardMedia component="img" image={imageUrl} alt="Post image" />;
    } else if (gallery && gallery.length > 0) {
      return gallery.map((imgUrl, index) => (
        <CardMedia key={index} component="img" image={imgUrl} alt={`Gallery image ${index + 1}`} sx={{ marginBottom: 1 }} />
      ));
    } else if (videoUrl) {
      return (
        <Box component="video" controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </Box>
      );
    }
  };

  return (
    <Box border={1} borderColor="grey.300" borderRadius={2} p={2} mb={2} overflow="hidden">
      <Link href={url} underline="hover" color="inherit" target="_blank" rel="noopener noreferrer">
        <Typography variant="h6" gutterBottom component="div">
          {decodedTitle}
        </Typography>
        {htmlBody}
      </Link>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {renderMedia()}
        </Grid>
      </Grid>
      <Stack direction="row" justifyContent="space-between" mt={2}>
        <Typography variant="body2">{username}</Typography>
        <Typography variant="body2">{votes} votes</Typography>
        <Typography variant="body2">{postDate}</Typography>
      </Stack>
    </Box>
  );
};

export default RedditPost