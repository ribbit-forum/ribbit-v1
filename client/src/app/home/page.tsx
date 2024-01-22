"use client";
import { Box, Text, Button } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import GoodEvening from "../components/GoodEvening";
import CreatePostComponent from "../components/CreatePostComponent";
import Trending from "../components/Trending";
import { useEffect, useState } from "react";
import { connect, disconnect } from "starknetkit";
import { ConnectedStarknetWindowObject } from "starknetkit";
import { RpcProvider, Contract } from "starknet";
import PostCard from "../components/ExploreCards";


const HomePage = () => {
  // State to store the input value
  const [postContent, setPostContent] = useState("");
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [provider, setProvider] = useState<any | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>()
  const [posts, setPosts] = useState([]);

  
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
    <Sidebar />
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
          <div className="relative flex items-center justify-end">
            <div className="flex items-center space-x-4">
              <button
                onSubmit={handleSubmit}
                className="px-12 py-3 bg-[#205B45] text-white rounded-2xl font-bold shadow-lg"
              >
                {address ? loading ? "loading" : "Create Post" : "Connect to Post"}
              </button>
            </div>
          </div>
        </form>
        <hr className="w-full h-1 bg-[#D9D9D9]" />
        {posts.map((post) => (
<PostCard
         key={post.postId}
         postId={post.postId}
         content={post.content}
         topic={post.topic}
         date={post.date}
         walletAddress={post.walletAddress}
         comments={post.comments}
         likes={post.likes}
       />
))}
      </Box>
      {/* <Trending /> */}
    </Box>
  );
};

export default HomePage;
