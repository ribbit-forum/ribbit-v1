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
    "postId": 1,
    "content": "🔥 Found a loophole for unlimited coffee refills at Cafe Java. Order the 'secret menu' medium roast, wink twice at the barista, and enjoy all-day caffeine! Don't tell everyone 😉.",
    "topic": "Lifehacks",
    "date": "2024-02-25",
    "walletAddress": "0xCoffeeLover",
    "likes": 65,
    "comments": 20,
    "imageUrl": "https://media0.giphy.com/media/26BRrSvJUa0crqw4E/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&rid=200w.gif&ct=g"
  },
  {
    "postId": 2,
    "content": "Last minute deal alert! 🚨 75% off round-trip flights to Tokyo for the next 48 hours on SkyHigh Airlines. Just used this for a spontaneous adventure. You're welcome!",
    "topic": "Last Minute Deals",
    "date": "2024-02-24",
    "walletAddress": "0xWanderlust",
    "likes": 85,
    "comments": 30,
    "imageUrl": "https://media0.giphy.com/media/l3vR9O3vpOCDRo8rC/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&rid=200w.gif&ct=g"
  },
  {
    "postId": 3,
    "content": "Insider advice: The best time to buy electronics? March & September. Stores clear out old stock for new models. Just snagged a high-end laptop for half the price!",
    "topic": "Insider Advice",
    "date": "2024-02-23",
    "walletAddress": "0xTechGuru",
    "likes": 70,
    "comments": 22,
    "imageUrl": "https://media0.giphy.com/media/xT0xeJpnrWC4XWblEk/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&rid=200w.gif&ct=g"
  },
  {
    "postId": 4,
    "content": "Ever wonder why your pizza never comes out right at home? 🍕 Secret tip: sprinkle a bit of sugar in the sauce. It caramelizes and gives that authentic pizzeria taste. Game changer!",
    "topic": "Cooking Hacks",
    "date": "2024-02-22",
    "walletAddress": "0xChefSecret",
    "likes": 90,
    "comments": 25,
    "imageUrl": "https://media0.giphy.com/media/3ohzdIuqJoo8QdKlnW/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&rid=200w.gif&ct=g"
  },
  {
    "postId": 5,
    "content": "Pro tip for free upgrades: Check in exactly 24 hours before your flight. Just got bumped to first class doing this. Fly like a king on a peasant's budget!",
    "topic": "Travel Hacks",
    "date": "2024-02-21",
    "walletAddress": "0xJetSetter",
    "likes": 78,
    "comments": 18,
    "imageUrl": "https://media0.giphy.com/media/26gssIytJvy1b1Pxx/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&rid=200w.gif&ct=g"
  },
    {
      "postId": 6,
      "content": "Just spent the morning rescuing kittens from an abandoned lot and found them all loving homes. Remember, a little kindness goes a long way. 🐱💕 #AdoptDontShop",
      "topic": "Animal Rescue",
      "date": "2024-02-20",
      "walletAddress": "0xKindSoul",
      "likes": 110,
      "comments": 45,
      "imageUrl": "https://media0.giphy.com/media/11s7Ke7jcNxCHS/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&rid=200w.gif&ct=g"
    },
    {
      "postId": 7,
      "content": "Saw an elderly neighbor struggling to mow his lawn in the heat today, so I did it for him. His smile was worth every drop of sweat. Let's look out for each other. 💚",
      "topic": "Community Help",
      "date": "2024-02-19",
      "walletAddress": "0xHelpingHand",
      "likes": 95,
      "comments": 32,
      "imageUrl": "https://media0.giphy.com/media/26AHAw0aMmWwRI4Hm/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&rid=200w.gif&ct=g"
    },
    {
      "postId": 8,
      "content": "My little brother was feeling down about not making the soccer team, so I organized a neighborhood match for him. His laughter was the best sound ever. 🥅⚽ #FamilyFirst",
      "topic": "Sibling Support",
      "date": "2024-02-18",
      "walletAddress": "0xFamilyGoals",
      "likes": 88,
      "comments": 27,
      "imageUrl": "https://media0.giphy.com/media/l0HlE56oAxpngfnWM/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&rid=200w.gif&ct=g"
    },
    {
      "postId": 9,
      "content": "Found a wallet stuffed with cash at the park and tracked down the owner to return it. Seeing their relief and gratitude reminded me there's still good in the world. 🌍💖",
      "topic": "Acts of Honesty",
      "date": "2024-02-17",
      "walletAddress": "0xHonestAbe",
      "likes": 103,
      "comments": 39,
      "imageUrl": "https://media0.giphy.com/media/xT39D7ubkIUIrgX7JS/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&rid=200w.gif&ct=g"
    },
    {
      "postId": 10,
      "content": "Baked cookies and delivered them to local frontline workers to brighten their day. Their hard work and dedication inspire me every day. 🍪💙 #SupportOurHeroes",
      "topic": "Gratitude",
      "date": "2024-02-16",
      "walletAddress": "0xCookieMonster",
      "likes": 120,
      "comments": 50,
      "imageUrl": "https://media0.giphy.com/media/3orieRlHJOwAaBrbzy/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&rid=200w.gif&ct=g"
    },
      {
        "postId": 11,
        "content": "Finally hit my goal of 100 pushups in one go! 🏋️‍♂️ Three months of dedication and early mornings. Remember, it's not about the goal, but who you become along the way. #NoExcuses",
        "topic": "Fitness Milestones",
        "date": "2024-02-15",
        "walletAddress": "0xFitnessFreak",
        "likes": 130,
        "comments": 60,
        "imageUrl": "https://media0.giphy.com/media/3o7TKPdUkkbCAVqWk0/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&rid=200w.gif&ct=g"
      },
      {
        "postId": 12,
        "content": "Stood at the top of Mount Everest this morning, feeling on top of the world. 🏔 Every step was a battle, but the view from the summit was worth every challenge. #DreamBig",
        "topic": "Adventure Triumphs",
        "date": "2024-02-14",
        "walletAddress": "0xAdventurer",
        "likes": 145,
        "comments": 75,
        "imageUrl": "https://media0.giphy.com/media/3oEduV4SOS9mmmIOkw/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&rid=200w.gif&ct=g"
      },
      {
        "postId": 13,
        "content": "Ran my first marathon today in honor of my mom, a cancer survivor. 🏃‍♂️💖 Every mile was for those fighting the battle. Together, we can beat cancer. #RunForACause",
        "topic": "Charity Challenges",
        "date": "2024-02-13",
        "walletAddress": "0xMarathoner",
        "likes": 160,
        "comments": 85,
        "imageUrl": "https://media0.giphy.com/media/l1J9u3TZfpmeDLkD6/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&rid=200w.gif&ct=g"
      },
      {
        "postId": 14,
        "content": "100 days of coding challenge completed! Went from zero to developing my first app. The journey has just begun. #CodeNewbie to #CodeNinja 🖥💪",
        "topic": "Learning Journeys",
        "date": "2024-02-12",
        "walletAddress": "0xCodeWarrior",
        "likes": 120,
        "comments": 64,
        "imageUrl": "https://media0.giphy.com/media/QHE5gWI0QjqF2/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&rid=200w.gif&ct=g"
      },
      {
        "postId": 15,
        "content": "Transformed an empty lot into a community garden, feeding dozens of families. 🌱🍅 It started as a small project but turned into a neighborhood mission. #GreenThumbCommunity",
        "topic": "Community Initiatives",
        "date": "2024-02-11",
        "walletAddress": "0xUrbanGardener",
        "likes": 110,
        "comments": 52,
        "imageUrl": "https://media0.giphy.com/media/3oz8xAFtqoOUUrsh7W/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&rid=200w.gif&ct=g"
      }
        
]



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

        <Flex gap="10px" wrap="wrap">
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
                comments={post.comments}
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
