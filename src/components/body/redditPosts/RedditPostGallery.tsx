import React from "react";
import useFetch from "../../../common/hooks/useFetch";
import RedditPost from "./RedditPost";
import { RedditPostData } from "../../../common/types";
import { Box, Typography, CircularProgress } from "@mui/material";

const RedditPostGallery: React.FC = () => {
  const url =
    "https://www.reddit.com/r/delhi/search.json?q=title:metro&restrict_sr=1&sort=new&limit=100";
  const {
    response: redditResponse,
    error,
    isPending,
  } = useFetch<{ data: { children: { data: RedditPostData }[] } }>(url);

  if (isPending)
    return (
      <Box textAlign="center">
        <CircularProgress />
      </Box>
    );
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!redditResponse || !redditResponse.data.children) return null;

  const posts = redditResponse.data.children.map(child => {
    const postData = child.data;
    
    const imageUrl = postData.preview?.images[0]?.source.url;
    
    let gallery: string[] | undefined;
    if (postData.is_gallery && postData.media_metadata) {
      gallery = Object.keys(postData.media_metadata)
        .map(key => postData.media_metadata![key].s.u.replace(/&amp;/g, '&')); // Use non-null assertion operator (!) carefully
    }
    
    const videoUrl = postData.secure_media?.reddit_video?.fallback_url;
  
    return {
      title: postData.title,
      body: postData.selftext_html,
      url: postData.url,
      username: postData.author,
      votes: postData.ups,
      createdUtc: postData.created_utc,
      imageUrl,
      gallery,
      videoUrl,
    };
  });
  

  return (
    <Box maxWidth="md" mx="auto">
      <Typography variant="h5" mb={2}>
        Posts about Delhi Metro from r/Delhi:
      </Typography>
      <Box
        maxHeight="96vh"
        overflow="auto"
        border={1}
        borderColor="grey.300"
        m={2}
        p={2}
      >
        {posts.map((post, index) => (
          <RedditPost
            key={index}
            title={post.title}
            body={post.body}
            url={post.url}
            username={post.username}
            votes={post.votes}
            createdUtc={post.createdUtc}
            imageUrl={post.imageUrl}
            gallery={post.gallery}
            videoUrl={post.videoUrl}
          />
        ))}
      </Box>
    </Box>
  );
};

export default RedditPostGallery;
