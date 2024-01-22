"use client";
import { FiHome, FiCompass, FiBell, FiSettings } from "react-icons/fi";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Icon,
  Button,
  Spacer,
} from "@chakra-ui/react";
import React from "react";

import { Box, VStack, Text, Divider, IconButton } from "@chakra-ui/react";
import {
  HomeIcon,
  ExploreIcon,
  NotificationIcon,
  WilliamWen,
} from "../Icons/Icons";

const Trending = () => {
  return (
    <div className="mx-4 my-8 md:mx-auto md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
        <div className="rounded-3xl border-4 border-[#669281] py-10 px-20 my-20 text-center text-5xl flex items-center justify-center">

            <a href="#" className="no-underline text-black"><b>Trending</b></a>
        </div>

        <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t-8 border-gray-300"></div>
            <div className="flex-grow border-t-8 border-gray-300"></div>
        </div>
        
        <div className="text-5xl tracking-wide py-20">
            <p>
                <b>Jump Back In</b>
            </p>
        </div>

        <div className="flex flex-col rounded-3xl bg-[#adc8be] gap-6 h-full py-10">
            <div className="text-3xl h-14 flex-auto mx-20 tracking-wide" >
                <a href="#" className="no-underline text-white"><b>Your Communities</b></a>
            </div>
            <div className="text-3xl h-14 flex-auto mx-20 tracking-wide">
                <a href="#" className="no-underline text-white">Soccer</a>
            </div>
            <div className="text-3xl h-14 flex-auto mx-20 tracking-wide">
                <a href="#" className="no-underline text-white">Basketball</a>
            </div>
            <div className="text-3xl h-14 flex-auto mx-20 tracking-wide">
                <a href="#" className="no-underline text-white">Coding</a>
            </div>
            <div className="text-3xl h-14 flex-auto mx-20 tracking-wide">
                <a href="#" className="no-underline text-white">University Life</a>
            </div>
            <div className="text-3xl h-14 flex-auto mx-20 tracking-wide">
                <a href="#" className="no-underline text-white">Pets</a>
            </div>
        </div>
        <div className="text-5xl tracking-wide py-16">
            <p>
                <b>Discover</b>
            </p>
        </div>
        
        <div className="flex flex-col gap-6 h-full pb-14">
            <div className="text-3xl h-10 flex-auto" >
                <a href="#" className="no-underline text-black"><b>Recommended Communities</b></a>
            </div>
            <div className="text-3xl h-10 flex-auto">
                <a href="#" className="no-underline text-black">Computer Science</a>
            </div>
            <div className="text-3xl h-10 flex-auto">
                <a href="#" className="no-underline text-black">Fishing</a>
            </div>
            <div className="text-3xl h-10 flex-auto">
                <a href="#" className="no-underline text-black">Game Development</a>
            </div>
        </div>

        <div className="text-5xl tracking-wide pt-10">
            <h1>
                <a href="#" className="no-underline text-black"><b>Create a New COmmunity</b></a>
            </h1>
        </div>
    </div>
  );
};

export default Trending;
