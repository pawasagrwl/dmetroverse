// PostFooter.js
import React from 'react';
import { Typography, Link, Stack } from '@mui/material';
import { format } from 'date-fns';
import { PostFooterProps } from '../../../../common/types';
const PostFooter: React.FC<PostFooterProps> = ({ username, votes, createdUtc }) => {  const postDate = format(new Date(createdUtc * 1000), 'PPPpp');
  const linkStyle = {
    textDecoration: 'none',
    color: 'primary.main',
    '&:hover': {
      textDecoration: 'underline',
    },
  };

  return (
    <Stack direction="row" justifyContent="space-between" mt={2}>
      <Link href={`https://www.reddit.com/user/${username}`} style={linkStyle} target="_blank" rel="noopener noreferrer">
        <Typography variant="body2" color="primary">u/{username}</Typography>
      </Link>
      <Typography variant="body2">{votes} votes</Typography>
      <Typography variant="body2">{postDate}</Typography>
    </Stack>
  );
};

export default PostFooter;
