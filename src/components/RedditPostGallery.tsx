import React from 'react';
import useFetch from '../common/hooks/useFetch';
import RedditPost from './RedditPost';
import { RedditPostData } from '../common/types';

const RedditPostGallery: React.FC = () => {
  const url = 'https://www.reddit.com/r/delhi/search.json?q=title:metro&restrict_sr=1&sort=new&limit=100';
  const { response: redditResponse, error, isPending } = useFetch<{ data: { children: { data: RedditPostData }[] } }>(url);

  if (isPending) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!redditResponse || !redditResponse.data.children) return null;

  const posts = redditResponse.data.children.map(child => child.data);
  return (
    <div className="max-w-md mx-auto">
      <h2 className="font-bold text-2xl mb-2">Delhi Subreddit Posts about Metro:</h2>
      <div className="h-96 overflow-y-scroll border border-gray-300 m-2 p-2">
        {posts.map((post, index) => (
          <RedditPost
            key={index}
            title={post.title}
            body={post.selftext_html}
            url={post.url}
          />
        ))}
      </div>
    </div>
  );
};

export default RedditPostGallery;
