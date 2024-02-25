"use client";

import { Box, Divider, IconButton, Text, VStack } from "@chakra-ui/react";
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
  Spacer,
} from "@chakra-ui/react";
import {
  ExploreIcon,
  HomeIcon,
  NotificationIcon,
  WilliamWen,
} from "../Icons/Icons";
import { FiBell, FiChevronRight, FiCompass, FiHome, FiSettings } from "react-icons/fi";
import React, { useState } from "react";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
          w={"500px"}
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
            </Flex>
            <Spacer />

            {/* <Flex direction={"column"} gap={"50px"} >
          <Flex direction={"row"}>
                <Button gap={'20px'} justifyContent={'left'} marginLeft={20} _hover={{background:'#D9D9D9'}} rounded={'lg'}>
                <HomeIcon/>
                <Text>Home </Text>
                </Button>
            </Flex>
          </Flex> */}
          </Flex>
        </Box>
      )}
    </>
  );
};

export default Sidebar;
