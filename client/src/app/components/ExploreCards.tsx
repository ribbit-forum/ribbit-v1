// components/PostCard.tsx
import { Text } from "@chakra-ui/react";
interface PostCardProps {
  postId: string;
  content: string;
  topic: string;
  date: string;
  walletAddress: string;
  comments: number;
  likes: number;
}

const PostCard: React.FC<PostCardProps> = ({
  postId,
  content,
  topic,
  date,
  walletAddress,
  comments,
  likes,
}) => {
  return (
    <div className="max-w-sm mx-auto rounded overflow-hidden shadow-lg bg-white p-6 text-black" style={{margin: "10px"}}>
      <p className="text-gray-700 text-base mb-4">{content}</p>
      <div className="text-sm mb-2">Topic: {topic}</div>
      <div className="text-sm mb-2">Post ID: {postId}</div>
      <div className="text-sm mb-2">
        Date: {new Date(date).toLocaleDateString()}
      </div>
      <div className="text-sm mb-2">Wallet Address: {walletAddress}</div>
      <div className="flex items-center justify-between mt-4">
      <span className="text-sm font-semibold">{likes} Likes</span>
        <span className="text-sm font-semibold">{comments} Comments</span>
      </div>
    </div>
  );
};

export default PostCard;
