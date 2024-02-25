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
import {
  ExploreIcon,
  HomeIcon,
  NotificationIcon,
  WilliamWen,
} from "../Icons/Icons";
import { FiAward, FiBell, FiChevronRight, FiCompass, FiHome, FiSettings } from "react-icons/fi";
import React, { useState } from "react";

import { Input } from 'antd';
import { SearchIcon } from "@chakra-ui/icons";

const { Search } = Input;

const Sidebar = () => {
  const [topics, setTopics] = useState([]); // ["topic1", "topic2"
  const [searchFilter, setSearchFilter] = useState(""); // ["topic1", "topic2"
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const onSearch = value => {
    console.log("Search: ", value);
    setSearchFilter(value);
  };
  const onAddTopic = value => {
    if (value != "") {
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
        icon={isSidebarOpen ? <FiChevronRight /> : <FiChevronRight />}
        onClick={handleSidebarToggle}
        position="fixed"
        top="50%"
        left="20px"
        transform="translateY(-50%)"
        zIndex="999" aria-label={""}      />

      {isSidebarOpen && (
        <Box
          bg="white"
          w={"600px"}
          p={5}
          shadow="md"
          borderRadius="md"
          h={"calc(100vh)"}
          textColor={"black"}
          padding={35}
          //   paddingRight={65}
        >
          <Flex direction={"row"} gap={"10px"}>
            <WilliamWen />

            <Text
              fontSize={36}
              fontWeight="bold"
              mb={4}
              textAlign="left"
              textColor={"#205B45"}
            >
              RIBBIT
            </Text>
          </Flex>
          <hr className="w-48 h-1 bg-[#D9D9D9]" />
          <Flex direction={"column"} justifyContent={"space-around"}>
            <Flex direction={"column"} gap={"50px"} mt={"40px"} fontSize={"18px"}>
              <Flex direction={"row"}>
                <Button
                  gap={"20px"}
                  justifyContent={"left"}
                  marginLeft={15}
                  _hover={{ background: "#D9D9D9" }}
                  className="rounded-xl"
                  pr={2}
                >
                  <HomeIcon />
                  <Text>Home </Text>
                </Button>
              </Flex>
              <Flex direction={"row"}>
                <Button
                  gap={"20px"}
                  justifyContent={"left"}
                  marginLeft={15}
                  _hover={{ background: "#D9D9D9" }}
                  className="rounded-xl"
                >
                  <ExploreIcon />
                  <Text>Explore </Text>
                </Button>
              </Flex>
              <Flex direction={"row"}>
                <Button
                  gap={"20px"}
                  justifyContent={"left"}
                  marginLeft={15}
                  _hover={{ background: "#D9D9D9" }}
                  className="rounded-xl"
                >
                  <NotificationIcon />
                  <Text>Notifications </Text>
                </Button>
              </Flex>
              <Flex direction={"row"}>
              <Search
                placeholder="input topic"
                allowClear
                enterButton="Add Topic"
                size="large"
                onSearch={onAddTopic}
              />
              </Flex>
              <Flex direction={"row"}>
              <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
              />
              </Flex>
              {topics
                .filter(topic => searchFilter === "" || topic.includes(searchFilter))
                .map((topic, index) => (
                  <Flex key={index} direction="row">
                    <Icon as={FiAward} />
                    <Text>{topic}</Text>
                  </Flex>
                ))}
              
            </Flex>
            <Spacer />
            
          </Flex>
        </Box>
      )}
    </>
  );
};

export default Sidebar;
