// PostHeader.js
import React from 'react';
import { Link, Typography } from '@mui/material';
import he from 'he';
import { PostHeaderProps } from '../../../../common/types';
const PostHeader: React.FC<PostHeaderProps> = ({ title, url }) => {  const decodedTitle = he.decode(title);

  return (
    <Link href={url} underline="hover" color="inherit" target="_blank" rel="noopener noreferrer">
      <Typography variant="h6" gutterBottom component="div" color="secondary">
        {decodedTitle}
      </Typography>
    </Link>
  );
};

export default PostHeader;
