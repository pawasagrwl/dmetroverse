import he from 'he';
import parse from 'html-react-parser';
interface RedditPostProps {
  title: string;
  body: string;
  url: string;
}

const RedditPost: React.FC<RedditPostProps> = ({ title, body, url }) => {
  const decodedTitle = he.decode(title);
  let decodedBody = body ? body.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&') : "No text" ;
   // Check if the body is longer than 400 characters
   if (decodedBody.length > 400) {
    decodedBody = `${decodedBody.substring(0, 388)}...(read more)`;
  }
  const htmlBody = parse(decodedBody);
  return (
    <div className="border border-gray-300 rounded p-2 mb-2 overflow-hidden whitespace-wrap">
      <a href={url} className="text-decoration-none text-black" target="_blank">
        <h3 className="font-bold underline">{decodedTitle}</h3>
      <p className="overflow-hidden text-gray-700">{htmlBody}</p>
      </a>
    </div>
  );
} 

export default RedditPost;
