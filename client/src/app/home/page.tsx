"use client";

import { Box, Button, Text } from "@chakra-ui/react";
import { Contract, RpcProvider } from "starknet";
import { connect, disconnect } from "starknetkit";
import { useEffect, useState } from "react";

import { ConnectedStarknetWindowObject } from "starknetkit";
import CreatePostComponent from "../components/CreatePostComponent";
import { Flex } from "antd";
import GoodEvening from "../components/GoodEvening";
import PostCard from "../components/ExploreCards";
import Sidebar from "../components/Sidebar";
import Trending from "../components/Trending";

const examplePosts = [
  {
    postId: 1,
    content: "This is the content of post 1",
    topic: "Technology",
    date: "2024-02-25",
    walletAddress: "0x123...",
    likes: 10,
  },
  {
    postId: 2,
    content: "This is the content of post 2",
    topic: "Science",
    date: "2024-02-24",
    walletAddress: "0x456...",
    likes: 20,
  },
  {
    postId: 3,
    content: "This is the content of post 3",
    topic: "Art",
    date: "2024-02-23",
    walletAddress: "0x789...",
    likes: 5,
  },
  {
    postId: 4,
    content: "This is the content of post 4",
    topic: "Music",
    date: "2024-02-22",
    walletAddress: "0xabc...",
    likes: 15,
  },
  {
    postId: 5,
    content: "This is the content of post 5",
    topic: "Literature",
    date: "2024-02-21",
    walletAddress: "0xdef...",
    likes: 7,
  },
  {
    postId: 6,
    content: "This is the content of post 6",
    topic: "Travel",
    date: "2024-02-20",
    walletAddress: "0xghi...",
    likes: 25,
  },
  {
    postId: 7,
    content: "This is the content of post 7",
    topic: "Food",
    date: "2024-02-19",
    walletAddress: "0xjkl...",
    likes: 30,
  },
  {
    postId: 8,
    content: "This is the content of post 8",
    topic: "Fashion",
    date: "2024-02-18",
    walletAddress: "0xmnop...",
    likes: 8,
  },
  {
    postId: 9,
    content: "This is the content of post 9",
    topic: "Sports",
    date: "2024-02-17",
    walletAddress: "0xqrst...",
    likes: 14,
  },
  {
    postId: 10,
    content: "This is the content of post 10",
    topic: "Gaming",
    date: "2024-02-16",
    walletAddress: "0xuvwx...",
    likes: 50,
  }
];

const HomePage = () => {
  // State to store the input value
  const [postContent, setPostContent] = useState("");
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [provider, setProvider] = useState<any | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>()
  const [posts, setPosts] = useState(examplePosts);
  const [currentTopic, setCurrentTopic] = useState<string>("All");

  
  const [theConnection, setConnection] =
    useState<ConnectedStarknetWindowObject>();

  // Function to handle form submission
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    setLoading(true)

    const connection = await connect();

    if (connection && connection.isConnected) {
      setConnection(connection);
      setProvider(connection.account);
      setAddress(connection.selectedAddress);

      const deployedStarknetContract = "0x5f7cd1fd465baff2ba9d2d1501ad0a2eb5337d9a885be319366b5205a414fdd";

      const starknetABI = await connection.provider.getClassAt(deployedStarknetContract);
      
      
      if (!starknetABI) {
        throw new Error("ABI not found.");
      }

      const StarknetContract = new Contract(starknetABI.abi, deployedStarknetContract, connection.account);
      StarknetContract.connect(connection.account);

      const myCall = StarknetContract.populate("increase_balance", [10, 30]);
      const res = await StarknetContract.increase_balance(myCall.calldata);
      await connection.provider.waitForTransaction(res.transaction_hash);


      window.alert(`Your transacation has went through ${res.transaction_hash}`)
      setPostContent('')

      try {
        console.log(postContent);
        let formData = new FormData();
        formData.append('content', postContent);
        formData.append('topic', ''); 
        formData.append('user_wallet_address', address as string);
        // Post data to the "/createPost" endpoint
        const response = await fetch("http://127.0.0.1:5000/createPost", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        // Handle success response
        console.log(data);
        setLoading(false)
      } catch (error) {
        // Handle errors
        console.error("Error posting the content:", error);
      }
    } else {
      window.alert("Not connected to Starknet");
    }
  };

  const fetchFeedData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/feed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_wallet_address: address }), // assuming 'address' is the user's wallet address
      });

      if (response.ok) {
        const data = await response.json();
        setPosts(data); // Update the posts state with the fetched data
      } else {
        console.error("Failed to fetch feed data");
      }
    } catch (error) {
      console.error("Error fetching feed data:", error);
    }
  };

  useEffect(() => {
    fetchFeedData();
  }, []);



  return (
<Box className="flex h-screen bg-gray-100 overflow-auto">
    <Sidebar setCurrentTopic={setCurrentTopic} />
    <Box className="flex-grow flex flex-col gap-5 px-5 pt-2 overflow-auto">

        <GoodEvening name={address as string} />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="What do you want to talk about today?"
            className="w-full px-4 py-8 border border-[#919191] rounded-xl focus:outline-none bg-[#EFEFEF] text-[#919191]"
          />
          <div className="flex items-center justify-between">
            <p>Current Topic: {currentTopic}</p>
            <div className="relative flex items-center">
              <div className="flex items-center space-x-4">
                <button
                  onSubmit={handleSubmit}
                  className="px-12 py-3 bg-[#205B45] text-white rounded-2xl font-bold shadow-lg"
                >
                  {address ? (loading ? "loading" : "Create Post") : "Connect to Post"}
                </button>
              </div>
            </div>
          </div>
        </form>
        <hr className="w-full h-1 bg-[#D9D9D9]" />

        <Flex direction="row" gap="10px" wrap="wrap">
          {posts
            .filter((post) => post.topic.toLowerCase() === currentTopic.toLowerCase() || currentTopic === "All")
            .map((post) => (
              <PostCard 
                key={post.postId}
                postId={post.postId.toString()}
                content={post.content}
                topic={post.topic}
                date={post.date}
                walletAddress={post.walletAddress}
                comments={3}
                likes={post.likes}
              />
            ))}
        </Flex>
        </Box>

      {/* <Trending /> */}
    </Box>
  );
};

export default HomePage;
