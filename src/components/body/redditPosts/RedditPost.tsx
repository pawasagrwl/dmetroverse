// RedditPost.js
import React from 'react';
import { Paper } from '@mui/material';
import PostHeader from './postComponents/PostHeader'; // Adjust the import path as necessary
import PostBody from './postComponents/PostBody'; // Adjust the import path as necessary
import PostFooter from './postComponents/PostFooter'; // Adjust the import path as necessary
import { RedditPostProps } from '../../../common/types'; // Adjust the import path as necessary

const RedditPost: React.FC<RedditPostProps> = (props) => {
  const { title, body, url, username, votes, createdUtc, imageUrl, gallery, videoUrl } = props;

  // Styles
  const paperStyle = {
    bgcolor: 'background.paper',
    boxShadow: 3,
    p: 2,
    mb: 2,
    borderRadius: 2,
    overflow: 'hidden',
    transition: '0.3s',
    '&:hover': {
      boxShadow: 6,
    },
  };

  return (
    <Paper sx={paperStyle}>
      <PostHeader title={title} url={url} />
      <PostBody body={body} imageUrl={imageUrl} gallery={gallery} videoUrl={videoUrl} />
      <PostFooter username={username} votes={votes} createdUtc={createdUtc} />
    </Paper>
  );
};

export default RedditPost;
