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
        icon={isSidebarOpen ? <FiChevronLeft /> : <FiChevronRight />}
        onClick={handleSidebarToggle}
        position="fixed"
        bottom="5%"
        left={isSidebarOpen ? "48px" : "48px"}
        top="95%"
        transform="translateY(-50%)"
        color={'black'}
        zIndex="999" aria-label={""}/>

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
            <div style={{marginLeft: "100px", marginRight: "100px"}}><RibbitLogo /></div>
          
            <Flex direction={"column"} gap={"30px"} mt={"40px"} fontSize={"18px"}>
              <Flex direction={"row"}>
              <Search
                placeholder="Add Topic"
                allowClear
                enterButton="➕"
                size={"middle"}
                onSearch={onAddTopic}
              />
              </Flex>
              <Flex direction={"row"}>
              <Search
                placeholder="Search Topic"
                allowClear
                enterButton="🔍"
                size="large"
                onSearch={onSearch}
              />
              </Flex>
              {searchFilter !== "" && <Text>Current Search: {searchFilter}</Text>}
              <Text>🐸 Your Subribbits: </Text>
              <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                {topics
                  .filter(topic => searchFilter === "" || topic.toLowerCase().includes(searchFilter.toLowerCase()))
                  .map((topic, index) => (
                    <Flex
                      key={index}
                      direction="row"
                      onClick={() => setCurrentTopic(topic)}
                      marginBottom="10px"
                      style={{ border: "1px solid gray", padding: "5px", borderRadius: "15px", cursor: "pointer"}}
                    >
                      <Text style={{ marginLeft: "10px" }}>
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
