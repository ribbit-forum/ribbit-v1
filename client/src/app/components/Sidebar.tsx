"use client";

import { Box, Divider, IconButton, InputGroup, InputLeftElement, Text, VStack } from "@chakra-ui/react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  Spacer
} from "@chakra-ui/react";
import { FiAward, FiBell, FiChevronLeft, FiChevronRight, FiCompass, FiHome, FiSettings } from "react-icons/fi";
import React, { useEffect, useState } from "react";

import { Input } from 'antd';
import {
  RibbitLogo,
  ChevronRight,
  ChevronLeft
} from "../Icons/Icons";

const { Search } = Input;

type SidebarProps = {
  // If topic is a string
  posts: any[];
  setCurrentTopic: (topic: string) => void;
};

const Sidebar = ({ posts, setCurrentTopic }: SidebarProps) => {


  const topicEmojiMap: Record<string, string> = {
    "All": "🐸",
    "Lifehacks": "🥷",
    "Wholesome": "🐱",
    "Milestones": "💪",
    "Starknet": "🌐",
  };

  const [topics, setTopics] = useState<string[]>([]);

  const [searchFilter, setSearchFilter] = useState(""); // ["topic1", "topic2"
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  useEffect(() => {
    const allTopics = [...new Set(posts.map((post) => post.topic))];
    const uniqueTopics = [...new Set([...topics, ...allTopics])]
    setTopics(uniqueTopics);
  }, [posts]);
  const onSearch = (value: React.SetStateAction<string>) => {
    console.log("Search: ", value);
    setSearchFilter(value);
  };
  const onAddTopic = (value: string) => {
    if (value !== "" && !topics.includes(value)) {
      setTopics([...topics, value]);
      console.log("On Add Topic: ", value);
    }
  };
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <IconButton
        icon={
          <Box
            borderRadius="full" // Makes the Box circular
            bg="FFFFFF" // Uses the current text color for the background, adjust as needed
            display="inline-flex" // Ensures the Box does not stretch
            alignItems="center" // Centers the icon vertically
            justifyContent="center" // Centers the icon horizontally
            p={1} // Adjust padding to control the size of the circle around the icon
          >
            {isSidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </Box>
        }
        bg="white"
        borderRadius="full"
        variant="outline"
        onClick={handleSidebarToggle}
        position="fixed"
        bottom="5%"
        left={isSidebarOpen ? "314px" : "0px"}
        top="95%"
        transform="translateY(-50%)"
        color={'black'}
        zIndex="999"
        aria-label={""} />

      {isSidebarOpen && (
        <Box
          bg="white"
          maxWidth={"500px"}
          p={5}
          shadow="md"
          borderRadius="md"
          h={"calc(100vh)"}
          textColor={"black"}
          // padding={48}
          paddingLeft={20}
        >
          <Flex direction={"row"} gap={"5px"}>
          </Flex>
          <Flex direction={"column"} justifyContent={"space-around"} alignItems="center">
            <div style={{ marginLeft: "80px", marginRight: "80px", marginTop: "30px" }}><RibbitLogo /></div>

            <Flex direction={"column"} gap={"10px"} mt={"1px"} fontSize={"18px"}>
              <Flex direction={"row"}>
                <Search
                  placeholder="Add Lily Pad"
                  allowClear
                  enterButton="➕"
                  size={"middle"}
                  onSearch={onAddTopic}
                />
              </Flex>
              <Text style={{ marginTop: "24px" }}>🐸 Your Lily Pads: </Text>
              <Flex direction={"row"}>
                <Search
                  placeholder="Search Lily Pad"
                  allowClear
                  enterButton="🔍"
                  size="middle"
                  onSearch={onSearch}
                />
              </Flex>
              {searchFilter !== "" && <Text>Current Search: {searchFilter}</Text>}
              <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                {topics
                  .filter(topic => searchFilter === "" || topic.toLowerCase().includes(searchFilter.toLowerCase()))
                  .map((topic, index) => (
                    <Flex
                      key={index}
                      direction="row"
                      onClick={() => setCurrentTopic(topic)}
                      marginBottom="10px"
                      style={{ padding: "5px", borderRadius: "8px", cursor: "pointer" }}
                      _hover={{ backgroundColor: "#F2F2F2" }}
                    >

                      <Text
                        style={{ marginLeft: "10px" }}
                      >
                        {topic in topicEmojiMap ? topicEmojiMap[topic] : "🐸"} {topic}
                      </Text>
                    </Flex>
                  ))}
              </div>

            </Flex>

          </Flex>
        </Box>
      )}
    </>
  );
};

export default Sidebar;
