import { Input, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";

const CreatePostComponent = () => {
  // State to store the input value
  const [postContent, setPostContent] = useState("");

  // Function to handle form submission
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    // Prevent default form submission behavior
    event.preventDefault();
    
    try {
        console.log(postContent);
        
      // Post data to the "/createPost" endpoint
    //   const response = await fetch('/createPost', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ content: postContent }),
    //   });

    //   const data = await response.json();
    //   // Handle success response
    //   console.log(data);
    } catch (error) {
      // Handle errors
      console.error('Error posting the content:', error);
    }
  };
  return (
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
          <button onSubmit={handleSubmit} className="px-12 py-3 bg-[#205B45] text-white rounded-2xl font-bold shadow-lg">
            Connect to post
          </button>
        </div>
      </div>

    </form>
  );
};

export default CreatePostComponent;
