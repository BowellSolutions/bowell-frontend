/**
 * @license MIT
 * Copyright (c) 2022 Adam Lisichin, Gustaw Daczkowski, Hubert Decyusz, Wojciech Nowicki
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE
 *
 * @author: Adam Lisichin
 * @file: Exports AuthNavbarLinks component - navbar rendered inside the dashboard
 **/
import {Box, Flex, Heading, Link, useColorModeValue} from "@chakra-ui/react";
import React, {FC, useEffect, useState} from "react";
import DashboardNavbarLinks from "./DashboardNavbarLinks";


interface DashboardNavbarProps {
  logoText: string,
  variant?: string,
  fixed: boolean,
  secondary: boolean,
  brandText: string,
  onOpen: () => void,
}

const DashboardNavbar: FC<DashboardNavbarProps> = (
  {logoText, variant, fixed, secondary, brandText, onOpen}
) => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarPosition = "absolute";
  let navbarFilter = "none";
  let navbarBackdrop = "blur(21px)";
  let navbarShadow = "none";
  let navbarBg = "none";
  let navbarBorder = "transparent";
  let secondaryMargin = "0px";
  let paddingX = "15px";

  const navShadow = useColorModeValue(
    "0px 7px 23px rgba(0, 0, 0, 0.05)",
    "none"
  );

  const navBg = useColorModeValue(
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 110.84%)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );

  const navBorder = useColorModeValue("#FFFFFF", "rgba(255, 255, 255, 0.31)");
  const navFilter = useColorModeValue(
    "none",
    "drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))"
  );

  if (fixed)
    if (scrolled) {
      navbarPosition = "fixed";
      navbarShadow = navShadow;
      navbarBg = navBg;
      navbarBorder = navBorder;
      navbarFilter = navFilter;
    }

  if (secondary) {
    navbarBackdrop = "none";
    navbarPosition = "absolute";
    mainText = "white";
    secondaryMargin = "22px";
    paddingX = "30px";
  }

  const changeNavbar = () => setScrolled(window.scrollY > 1);

  useEffect(() => {
    window.addEventListener("scroll", changeNavbar);
    return () => window.removeEventListener("scroll", changeNavbar);
  }, []);

  return (
    <Flex
      // @ts-ignore
      position={navbarPosition}
      boxShadow={navbarShadow}
      bg={navbarBg}
      borderColor={navbarBorder}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      borderWidth="1.5px"
      borderStyle="solid"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      alignItems={{xl: "center"}}
      borderRadius="16px"
      display="flex"
      minH="75px"
      justifyContent={{xl: "center"}}
      lineHeight="25.6px"
      mx="auto"
      mt={secondaryMargin}
      pb="8px"
      left=""
      right="30px"
      px={{sm: paddingX, md: "30px",}}
      ps={{xl: "12px",}}
      pt="8px"
      top="18px"
      w={{sm: "calc(100vw - 30px)", xl: "calc(100vw - 75px - 275px)"}}
    >
      <Flex w="100%" flexDirection={"row"} alignItems={"center"}>
        <Flex mb={{sm: "0px", md: "0px"}}>
          <Link
            color={mainText}
            href="#"
            bg="inherit"
            borderRadius="inherit"
            fontWeight="bold"
            _hover={{color: {mainText}}}
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{boxShadow: "none",}}
          >
            <Heading as="h1" size="lg" pl={"16px"}>
              {brandText}
            </Heading>
          </Link>
        </Flex>

        <Box ms="auto" w={{sm: "100%", md: "unset"}}>
          <DashboardNavbarLinks
            onOpen={onOpen}
            logoText={logoText}
            secondary={secondary}
            fixed={fixed}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default DashboardNavbar;
