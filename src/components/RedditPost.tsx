import he from 'he';

interface RedditPostProps {
  title: string;
  body: string;
  url: string;
}

const RedditPost: React.FC<RedditPostProps> = ({ title, body, url }) => {
  const decodedTitle = he.decode(title);
  const decodedBody = body && body.length > 400 ? he.decode(`${body.substring(0, 397)}...`) : he.decode(body);
  return (
    <div className="border border-gray-300 rounded p-2 mb-2 overflow-hidden whitespace-wrap">
      <a href={url} className="text-decoration-none text-black">
        <h3 className="font-bold">{decodedTitle}</h3>
      <p className="overflow-hidden text-gray-700">{decodedBody || "No text"}</p>
      </a>
    </div>
  );
} 

export default RedditPost;
