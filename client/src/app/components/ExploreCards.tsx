// components/PostCard.tsx
import { Text } from "@chakra-ui/react";
import { HeartOutline, HeartFilled, FlyOutline } from "../Icons/Icons";
interface PostCardProps {
  setCurrentTopic: (arg0: string) => void;
  setCurrentAddress: (arg0: string) => void;
  onTip: (index: number, amount: number)=>void;
  onLike: (index: string)=>void;
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
  onTip,
  onLike,
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
  if (imageUrl === "") {
    imageUrl = "http://tinyurl.com/asjks12";

  }
  return (
    <div className="max-w-xs mx-auto rounded-lg overflow-hidden shadow-lg bg-white p-6 text-black">
      <div className="text-sm mb-2">
        Posted by:
        <a onClick={() => setCurrentAddress(walletAddress)} className="text-[#EC796B]">
          {" "}{walletAddress.slice(0, 8)}{"... "}
        </a>
        to
        <a onClick={() => setCurrentTopic(topic)} className="text-[#EC796B]">
          {" "}{topic}{" "}
        </a>
        on {date}
      </div>

      {imageUrl && <img src={imageUrl} alt="Post Image" className="w-full h-48 object-cover mb-4 max-w-72" />}
      <p className="text-gray-700 text-base mb-4">{content}</p>
      {/* <div className="text-sm mb-2">Post ID: {postId}</div> */}
      <div className="flex items-center justify-between mt-4">
        {/* <span className="text-sm font-semibold">{likes}</span> */}
        <span className="text-sm font-semibold text-[#4D4DB2]">{finality}</span>
        {/* 
        1. find an svg and copy the way that it is done in the Icons
        2. import that into here
        3. ask edison for more steps later
        */}
<span className="flex gap-5">
  <span className="cursor-pointer" onClick={() => onTip(Number(postId),1)}><FlyOutline/></span>
  <span className="flex gap-1">
    <span className="cursor-pointer" onClick={() => onLike(postId)}><HeartOutline /></span>
            <span className="text-sm font-semibold">{likes}</span>
          </span>
        </span>
      </div>
    </div>
  );
};

export default PostCard;
