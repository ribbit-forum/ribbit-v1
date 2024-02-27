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
  status: string
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
  imageUrl,
  status = "Accepted on L2"
}) => {
  const finality = "Accepted on L2"
  return (
    <div className="max-w-sm mx-auto rounded overflow-hidden shadow-lg bg-white p-6 text-black">
      <div className="text-sm mb-2">
        Posted by: 
        <a onClick={() => setCurrentAddress(walletAddress)} className="text-[#EC796B]">
        {" "}{walletAddress}{" "}
        </a> 
        to 
        <a onClick={() => setCurrentTopic(topic)} className="text-[#EC796B]">
        {" "}{topic}{" "}
        </a> 
        on {date}
      </div>

      {imageUrl && <img src={imageUrl} alt="Post Image" className="w-full h-48 object-cover mb-4" />}
      <p className="text-gray-700 text-base mb-4">{content}</p>
      {/* <div className="text-sm mb-2">Post ID: {postId}</div> */}
      <div className="flex items-center justify-between mt-4">
      {/* <span className="text-sm font-semibold">{likes}</span> */}
      <span className="text-sm font-semibold text-[#4D4DB2]">{finality}</span>
        <span className="text-sm font-semibold">{comments} Comments</span>
      </div>
    </div>
  );
};

export default PostCard;
