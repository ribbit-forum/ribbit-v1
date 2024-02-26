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
    content: "Why don't we ever tell secrets on a farm? Because the potatoes have eyes, the corn has ears, and the beans stalk.",
    topic: "Dad Jokes",
    date: "2024-02-25",
    walletAddress: "0xPotato",
    likes: 45,
    comments: 12,
    imageUrl: "https://media0.giphy.com/media/unQ3IJU2RG7DO/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&ep=v1_gifs_related&rid=200w.gif&ct=g",
  },
  {
    postId: 2,
    content: "Just saw a duck practicing its coding skills. Guess we now have a new web quack developer in town.",
    topic: "Tech Puns",
    date: "2024-02-24",
    walletAddress: "0xDuck123",
    likes: 52,
    comments: 9,
    imageUrl: "https://media0.giphy.com/media/unQ3IJU2RG7DO/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&ep=v1_gifs_related&rid=200w.gif&ct=g",
  },
  {
    postId: 3,
    content: "Why did the scarecrow win an award? Because he was outstanding in his field! 🌾",
    topic: "Puns",
    date: "2024-02-23",
    walletAddress: "0xScarecrow",
    likes: 38,
    comments: 8,
    imageUrl: "https://media0.giphy.com/media/unQ3IJU2RG7DO/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&ep=v1_gifs_related&rid=200w.gif&ct=g",
  },
  {
    postId: 4,
    content: "I told my computer I needed a break, and it replied, 'You and me both!'",
    topic: "Tech Life",
    date: "2024-02-22",
    walletAddress: "0xCompLife",
    likes: 60,
    comments: 11,
    imageUrl: "https://media0.giphy.com/media/unQ3IJU2RG7DO/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&ep=v1_gifs_related&rid=200w.gif&ct=g",
  },
  {
    postId: 5,
    content: "If we can't see air, do fish see water? 🤔",
    topic: "Shower Thoughts",
    date: "2024-02-21",
    walletAddress: "0xDeepThought",
    likes: 47,
    comments: 7,
    imageUrl: "https://media0.giphy.com/media/unQ3IJU2RG7DO/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&ep=v1_gifs_related&rid=200w.gif&ct=g",
  },
  {
    postId: 6,
    content: "Breaking News: Local dog goes to Mars, claims 'much space, very wow!'",
    topic: "Space Dogs",
    date: "2024-02-20",
    walletAddress: "0xDogeCoin",
    likes: 75,
    comments: 15,
    imageUrl: "https://media0.giphy.com/media/unQ3IJU2RG7DO/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&ep=v1_gifs_related&rid=200w.gif&ct=g",
  },
  {
    postId: 7,
    content: "What do you call fake spaghetti? An impasta!",
    topic: "Food Jokes",
    date: "2024-02-19",
    walletAddress: "0xPastaChef",
    likes: 55,
    comments: 14,
    imageUrl: "https://media0.giphy.com/media/unQ3IJU2RG7DO/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&ep=v1_gifs_related&rid=200w.gif&ct=g",
  },
  {
    postId: 8,
    content: "I tried to catch some fog earlier. I mist.",
    topic: "Weather Puns",
    date: "2024-02-18",
    walletAddress: "0xCloudyDays",
    likes: 43,
    comments: 5,
    imageUrl: "https://media0.giphy.com/media/unQ3IJU2RG7DO/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&ep=v1_gifs_related&rid=200w.gif&ct=g",
  },
  {
    postId: 9,
    content: "Why did the Gen Z plant sit in front of the mirror? To take a shelfie.",
    topic: "Gen Z Trends",
    date: "2024-02-17",
    walletAddress: "0xPlantMom",
    likes: 66,
    comments: 10,
    imageUrl: "https://media0.giphy.com/media/unQ3IJU2RG7DO/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&ep=v1_gifs_related&rid=200w.gif&ct=g",
  },
  {
    postId: 10,
    content: "Life update: Currently holding auditions for my sleep paralysis demon. Must be less scary and more motivational.",
    topic: "Late Night Thoughts",
    date: "2024-02-16",
    walletAddress: "0xInsomniac",
    likes: 82,
    comments: 18,
    imageUrl: "https://media0.giphy.com/media/unQ3IJU2RG7DO/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&ep=v1_gifs_related&rid=200w.gif&ct=g",
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
  const [currentAddress, setCurrentAddress] = useState<string>("All");


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

      const deployedStarknetContract = "0x07bd868e8ba52991fce96af898c529c8bbc011f982a1e49626118050c4b0d0d6";

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
      <Box className="flex-grow flex flex-col gap-5 px-10 pt-2 overflow-auto">

        <Text className="text-5xl font-bold mt-8 text-left color"
          textColor={"#EC796B"}
        >
          RIBBIT
        </Text>
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
            <p>Topic: {currentTopic}</p>
            <Button onClick={() => {
              setCurrentTopic("All");
            }}>Reset Topic</Button>
            <p>Address: {currentAddress}</p>
            <Button onClick={() => {
              setCurrentAddress("All");
            }}>Reset Address</Button>
            <div className="relative flex items-center">
              <div className="flex items-center space-x-4">
                <button
                  onSubmit={handleSubmit}
                  className="px-12 py-3 bg-[#4D4DB2] text-white rounded-2xl font-bold shadow-lg"
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
            .filter((post) => ((post.topic.toLowerCase() === currentTopic.toLowerCase() || currentTopic === "All") && (post.walletAddress.toLowerCase() === currentAddress.toLowerCase() || currentAddress === "All")))
            .map((post) => (
              <PostCard
                setCurrentTopic={setCurrentTopic}
                setCurrentAddress={setCurrentAddress}
                key={post.postId}
                postId={post.postId.toString()}
                content={post.content}
                topic={post.topic}
                date={post.date}
                walletAddress={post.walletAddress}
                comments={3}
                likes={post.likes}
                imageUrl={post.imageUrl}
              />
            ))}
        </Flex>
      </Box>

      {/* <Trending /> */}
    </Box>
  );
};

export default HomePage;
