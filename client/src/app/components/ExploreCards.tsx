// components/PostCard.tsx
import { Text } from "@chakra-ui/react";
interface PostCardProps {
  setCurrentTopic: (arg0: string) => void;
  setCurrentAddress: (arg0: string) => void;
  postId: string;
  content: string;
  topic: string;
  date: string;
  walletAddress: string;
  comments: number;
  likes: number;
  imageUrl: string;
}

const PostCard: React.FC<PostCardProps> = ({
  setCurrentTopic,
  setCurrentAddress,
  postId,
  content,
  topic,
  date,
  walletAddress,
  comments,
  likes,
  imageUrl
}) => {
  return (
    <div className="max-w-sm mx-auto rounded overflow-hidden shadow-lg bg-white p-6 text-black">
      <div className="text-sm mb-2">
        Posted by: 
        <a onClick={() => setCurrentAddress(walletAddress)} className="text-blue-500">
        {" "}{walletAddress}{" "}
        </a> 
        to 
        <a onClick={() => setCurrentTopic(topic)} className="text-blue-500">
        {" "}{topic}{" "}
        </a> 
        on {new Date(date).toLocaleDateString()}
      </div>

      {imageUrl && <img src={imageUrl} alt="Post Image" className="w-full h-48 object-cover mb-4" />}
      <p className="text-gray-700 text-base mb-4">{content}</p>
      {/* <div className="text-sm mb-2">Post ID: {postId}</div> */}
      <div className="flex items-center justify-between mt-4">
      <span className="text-sm font-semibold">{likes} Likes</span>
        <span className="text-sm font-semibold">{comments} Comments</span>
      </div>
    </div>
  );
};

export default PostCard;
