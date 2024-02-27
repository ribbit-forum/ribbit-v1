"use client";

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Contract, RpcProvider, shortString } from "starknet";
import { connect, disconnect } from "starknetkit";
import { useEffect, useState } from "react";

import { ConnectedStarknetWindowObject } from "starknetkit";
import CreatePostComponent from "../components/CreatePostComponent";
import GoodEvening from "../components/GoodEvening";
import PostCard from "../components/ExploreCards";
import Sidebar from "../components/Sidebar";
import Trending from "../components/Trending";
import { useToast } from '@chakra-ui/react'

// const examplePosts = [
//   {
//     "postId": 1,
//     "content": "🔥 Found a loophole for unlimited coffee refills at Cafe Java. Order the 'secret menu' medium roast, wink twice at the barista, and enjoy all-day caffeine! Don't tell everyone 😉.",
//     "topic": "Lifehacks",
//     "date": "2024-02-25",
//     "walletAddress": "0xCoffeeLover",
//     "likes": 65,
//     "comments": 20,
//     "imageUrl": "https://media0.giphy.com/media/26BRrSvJUa0crqw4E/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&rid=200w.gif&ct=g"
//   },
//   {
//     "postId": 2,
//     "content": "Last minute deal alert! 🚨 75% off round-trip flights to Tokyo for the next 48 hours on SkyHigh Airlines. Just used this for a spontaneous adventure. You're welcome!",
//     "topic": "Lifehacks",
//     "date": "2024-02-24",
//     "walletAddress": "0xWanderlust",
//     "likes": 85,
//     "comments": 30,
//     "imageUrl": "https://media0.giphy.com/media/l3vR9O3vpOCDRo8rC/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&rid=200w.gif&ct=g"
//   },
//   {
//     "postId": 3,
//     "content": "Insider advice: The best time to buy electronics? March & September. Stores clear out old stock for new models. Just snagged a high-end laptop for half the price!",
//     "topic": "Lifehacks",
//     "date": "2024-02-23",
//     "walletAddress": "0xTechGuru",
//     "likes": 70,
//     "comments": 22,
//     "imageUrl": "https://media0.giphy.com/media/xT0xeJpnrWC4XWblEk/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&rid=200w.gif&ct=g"
//   },
//   {
//     "postId": 4,
//     "content": "Ever wonder why your pizza never comes out right at home? 🍕 Secret tip: sprinkle a bit of sugar in the sauce. It caramelizes and gives that authentic pizzeria taste. Game changer!",
//     "topic": "Lifehacks",
//     "date": "2024-02-22",
//     "walletAddress": "0xChefSecret",
//     "likes": 90,
//     "comments": 25,
//     "imageUrl": "https://media0.giphy.com/media/3ohzdIuqJoo8QdKlnW/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&rid=200w.gif&ct=g"
//   },
//   {
//     "postId": 5,
//     "content": "Pro tip for free upgrades: Check in exactly 24 hours before your flight. Just got bumped to first class doing this. Fly like a king on a peasant's budget!",
//     "topic": "Lifehacks",
//     "date": "2024-02-21",
//     "walletAddress": "0xJetSetter",
//     "likes": 78,
//     "comments": 18,
//     "imageUrl": "https://media0.giphy.com/media/26gssIytJvy1b1Pxx/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&rid=200w.gif&ct=g"
//   },
//     {
//       "postId": 6,
//       "content": "Just spent the morning rescuing kittens from an abandoned lot and found them all loving homes. Remember, a little kindness goes a long way. 🐱💕 #AdoptDontShop",
//       "topic": "Wholesome",
//       "date": "2024-02-20",
//       "walletAddress": "0xKindSoul",
//       "likes": 110,
//       "comments": 45,
//       "imageUrl": "https://media0.giphy.com/media/11s7Ke7jcNxCHS/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&rid=200w.gif&ct=g"
//     },
//     {
//       "postId": 7,
//       "content": "Saw an elderly neighbor struggling to mow his lawn in the heat today, so I did it for him. His smile was worth every drop of sweat. Let's look out for each other. 💚",
//       "topic": "Wholesome",
//       "date": "2024-02-19",
//       "walletAddress": "0xHelpingHand",
//       "likes": 95,
//       "comments": 32,
//       "imageUrl": "https://media0.giphy.com/media/26AHAw0aMmWwRI4Hm/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&rid=200w.gif&ct=g"
//     },
//     {
//       "postId": 8,
//       "content": "My little brother was feeling down about not making the soccer team, so I organized a neighborhood match for him. His laughter was the best sound ever. 🥅⚽ #FamilyFirst",
//       "topic": "Wholesome",
//       "date": "2024-02-18",
//       "walletAddress": "0xFamilyGoals",
//       "likes": 88,
//       "comments": 27,
//       "imageUrl": "https://media0.giphy.com/media/l0HlE56oAxpngfnWM/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&rid=200w.gif&ct=g"
//     },
//     {
//       "postId": 9,
//       "content": "Found a wallet stuffed with cash at the park and tracked down the owner to return it. Seeing their relief and gratitude reminded me there's still good in the world. 🌍💖",
//       "topic": "Wholesome",
//       "date": "2024-02-17",
//       "walletAddress": "0xHonestAbe",
//       "likes": 103,
//       "comments": 39,
//       "imageUrl": "https://media0.giphy.com/media/xT39D7ubkIUIrgX7JS/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&rid=200w.gif&ct=g"
//     },
//     {
//       "postId": 10,
//       "content": "Baked cookies and delivered them to local frontline workers to brighten their day. Their hard work and dedication inspire me every day. 🍪💙 #SupportOurHeroes",
//       "topic": "Wholesome",
//       "date": "2024-02-16",
//       "walletAddress": "0xCookieMonster",
//       "likes": 120,
//       "comments": 50,
//       "imageUrl": "https://media0.giphy.com/media/3orieRlHJOwAaBrbzy/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&rid=200w.gif&ct=g"
//     },
//       {
//         "postId": 11,
//         "content": "Finally hit my goal of 100 pushups in one go! 🏋️‍♂️ Three months of dedication and early mornings. Remember, it's not about the goal, but who you become along the way. #NoExcuses",
//         "topic": "Milestones",
//         "date": "2024-02-15",
//         "walletAddress": "0xFitnessFreak",
//         "likes": 130,
//         "comments": 60,
//         "imageUrl": "https://media0.giphy.com/media/3o7TKPdUkkbCAVqWk0/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&rid=200w.gif&ct=g"
//       },
//       {
//         "postId": 12,
//         "content": "Stood at the top of Mount Everest this morning, feeling on top of the world. 🏔 Every step was a battle, but the view from the summit was worth every challenge. #DreamBig",
//         "topic": "Milestones",
//         "date": "2024-02-14",
//         "walletAddress": "0xAdventurer",
//         "likes": 145,
//         "comments": 75,
//         "imageUrl": "https://media0.giphy.com/media/3oEduV4SOS9mmmIOkw/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&rid=200w.gif&ct=g"
//       },
//       {
//         "postId": 13,
//         "content": "Ran my first marathon today in honor of my mom, a cancer survivor. 🏃‍♂️💖 Every mile was for those fighting the battle. Together, we can beat cancer. #RunForACause",
//         "topic": "Milestones",
//         "date": "2024-02-13",
//         "walletAddress": "0xMarathoner",
//         "likes": 160,
//         "comments": 85,
//         "imageUrl": "https://media0.giphy.com/media/l1J9u3TZfpmeDLkD6/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&rid=200w.gif&ct=g"
//       },
//       {
//         "postId": 14,
//         "content": "100 days of coding challenge completed! Went from zero to developing my first app. The journey has just begun. #CodeNewbie to #CodeNinja 🖥💪",
//         "topic": "Milestones",
//         "date": "2024-02-12",
//         "walletAddress": "0xCodeWarrior",
//         "likes": 120,
//         "comments": 64,
//         "imageUrl": "https://media0.giphy.com/media/QHE5gWI0QjqF2/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&rid=200w.gif&ct=g"
//       },
//       {
//         "postId": 15,
//         "content": "Transformed an empty lot into a community garden, feeding dozens of families. 🌱🍅 It started as a small project but turned into a neighborhood mission. #GreenThumbCommunity",
//         "topic": "Milestones",
//         "date": "2024-02-11",
//         "walletAddress": "0xUrbanGardener",
//         "likes": 110,
//         "comments": 52,
//         "imageUrl": "https://media0.giphy.com/media/3oz8xAFtqoOUUrsh7W/200w.gif?cid=82a1493b3kiz49wjv8ue03z7ks28dhl78envfu435bged6ns&rid=200w.gif&ct=g"
//       },
//           {
//               "postId": 16,
//               "content": "That Edison guy is kinda cute, I won't lie. Saw him debugging like a pro. #TechCrush",
//               "topic": "Starknet",
//               "date": "2024-02-24",
//               "walletAddress": "0xSecretAdmirer",
//               "likes": 43,
//               "comments": 7,
//               "imageUrl": "https://media4.giphy.com/media/l41lUJ1YoZB1lHVPG/giphy.gif"
//           },
//           {
//               "postId": 17,
//               "content": "Shoutout to Pierre, literally the only reason my Cairo smart contract works. Man's a wizard! #CairoHero",
//               "topic": "Starknet",
//               "date": "2024-02-24",
//               "walletAddress": "0xGratefulDev",
//               "likes": 56,
//               "comments": 12,
//               "imageUrl": "https://media1.giphy.com/media/3ohs4Bkcs4eKd51dqo/giphy.gif"
//           },
//           {
//               "postId": 18,
//               "content": "Denver transit is free for anyone under 19!! Great way to explore the city on a budget. #TravelHack",
//               "topic": "Starknet",
//               "date": "2024-02-23",
//               "walletAddress": "0xExplorer",
//               "likes": 67,
//               "comments": 15,
//               "imageUrl": "https://media2.giphy.com/media/QMHoU66sBXqqLqYvGO/giphy.gif"
//           },
//           {
//               "postId": 19,
//               "content": "There's a train from the airport to Union Station for $10 so you don't have to buy an expensive Uber. #SmartTravel",
//               "topic": "Starknet",
//               "date": "2024-02-23",
//               "walletAddress": "0xSavvyTraveler",
//               "likes": 75,
//               "comments": 22,
//               "imageUrl": "https://media3.giphy.com/media/l0Iy5fjHyedk9aDGU/giphy.gif"
//           },
//           {
//               "postId": 20,
//               "content": "There's a free mall ride that takes you from Union to the hotel. Handy for last-minute shopping or just getting around. #FreeRide",
//               "topic": "Starknet",
//               "date": "2024-02-24",
//               "walletAddress": "0xUrbanNavigator",
//               "likes": 82,
//               "comments": 29,
//               "imageUrl": "https://media0.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif"
//           }
      
      
       
// ]



const HomePage = () => {
  // State to store the input value
  const [postContent, setPostContent] = useState("");
  const [imageUrlInput, setImageUrlInput] = useState("");

  const [address, setAddress] = useState<string | undefined>(undefined);
  const [provider, setProvider] = useState<any | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>()
  const [posts, setPosts] = useState<any[]>([]);
  const [currentTopic, setCurrentTopic] = useState<string>("All");
  const [currentAddress, setCurrentAddress] = useState<string>("All");
  const toast = useToast()


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

      if(postContent == ""){
        toast({
          title: 'You need to write something!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        }
        )

        window.alert("You need to write something!")
        setLoading(false)
        return 

      }
      const deployedStarknetContract = "0x007c81cd5cea645ac13f859ccdbb26c7de4df523ecdf7fef12d978c24cfa56e0";

      const starknetABI = await connection.provider.getClassAt(deployedStarknetContract);


      if (!starknetABI) {
        throw new Error("ABI not found.");
      }

      
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1; 
      const day = now.getDate();

      const monthPadded = String(month).padStart(2, '0');
      const dayPadded = String(day).padStart(2, '0');


      const fullDate = `${year}${monthPadded}${dayPadded}`;

      const StarknetContract = new Contract(starknetABI.abi, deployedStarknetContract, connection.account);
      StarknetContract.connect(connection.account);

      console.log(connection.selectedAddress, postContent, fullDate, currentTopic);

      const myCall = StarknetContract.populate("addPost", [connection.selectedAddress, postContent, fullDate,currentTopic ]);

      const res = await StarknetContract.addPost(myCall.calldata);
      console.log("response",res);
      
      const receipt = await connection.provider.waitForTransaction(res.transaction_hash);
      

      window.alert(`Your transacation has went through ${res.transaction_hash}`)
      setPostContent('')
      setLoading(false)



    } else {
      window.alert("Not connected to Starknet");
    }
  };

  const fetchFeedData = async () => {
    const connection = await connect();
    if (connection && connection.isConnected) {
      const deployedStarknetContract = "0x007c81cd5cea645ac13f859ccdbb26c7de4df523ecdf7fef12d978c24cfa56e0";
      const starknetABI = await connection.provider.getClassAt(deployedStarknetContract);
      if (!starknetABI) {
        throw new Error("ABI not found.");
      }
      const StarknetContract = new Contract(starknetABI.abi, deployedStarknetContract, connection.account);
      StarknetContract.connect(connection.account);
      const postsResponse = await StarknetContract.call("getAllPosts");

      // Assuming postsResponse directly contains the array of post objects
      const transformedPosts = postsResponse.map(post => {
        return {
          deleted: post.deleted,
          likes: Number(post.likes), 
          message: shortString.decodeShortString(post.message), 
          timestamp: shortString.decodeShortString(post.timestamp),
          topic: shortString.decodeShortString(post.topic), 
          userAddress: shortString.decodeShortString(post.userAddress)
        };
      });

      console.log(transformedPosts);
      
  
      setPosts(transformedPosts);
    } else {
      window.alert("Not connected to Starknet");
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
          <input
            type="text"
            value={imageUrlInput}
            onChange={(e) => setImageUrlInput(e.target.value)}
            placeholder="Image URL"
            className="w-full px-4 py-4 border border-[#919191] rounded-xl focus:outline-none bg-[#EFEFEF] text-[#919191]"
          />
            <div className="flex items-center justify-between flex-wrap text-black">
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
                  className="px-12 py-3 bg-[#EC796B] text-white rounded-2xl font-bold shadow-lg"
                >
                  {address ? (loading ? "loading" : "Create Post") : "Connect to Post"}
                </button>
              </div>
            </div>
          </div>
        </form>
        <hr className="w-full h-1 bg-[#D9D9D9]" />

        <Flex gap="10px" wrap="wrap">
        {
  posts
    .filter((post) => (
      (post.topic?.toLowerCase() === currentTopic.toLowerCase() || currentTopic === "All") &&
      (post.userAddress?.toLowerCase() === currentAddress.toLowerCase() || currentAddress === "All")
    ))
    .map((post, index) => ( // Using index as a fallback key; consider adding a unique postId if available.
      <PostCard
        setCurrentTopic={setCurrentTopic}
        setCurrentAddress={setCurrentAddress}
        key={index} 
        postId={index.toString()} 
        content={post.message} 
        topic={post.topic}
        date={post.timestamp}
        walletAddress={post.userAddress}
        comments={0} // Assuming no comments field; provide actual data if available.
        likes={post.likes.toString()}
        imageUrl="" // Assuming no imageUrl; provide actual data if available.
      />
    ))
}

        </Flex>
      </Box>

      {/* <Trending /> */}
    </Box>
  );
};

export default HomePage;
