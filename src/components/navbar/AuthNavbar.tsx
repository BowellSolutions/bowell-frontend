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
 * @file: Exports AuthNavbar component - navbar used in /login and /register routes
 **/
import {Box, Flex, Image, Link, Text, useColorModeValue,} from "@chakra-ui/react";
import {FC} from "react";
import NextLink from "next/link";
import SidebarResponsive from "../sidebar/SidebarResponsive";
import AuthNavbarLinks from "./AuthNavbarLinks";

interface AuthNavbarProps {
  logo?: string,
  logoText: string,
  secondary: boolean,
}

const AuthNavbar: FC<AuthNavbarProps> = ({logo, logoText, secondary, ...rest}) => {
  let navbarIcon = useColorModeValue("gray.700", "gray.200");
  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarBg = useColorModeValue(
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 110.84%)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );
  let navbarBorder = useColorModeValue(
    "1.5px solid #FFFFFF",
    "1.5px solid rgba(255, 255, 255, 0.31)"
  );
  let navbarShadow = useColorModeValue(
    "0px 7px 23px rgba(0, 0, 0, 0.05)",
    "none"
  );
  let navbarFilter = useColorModeValue(
    "none",
    "drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))"
  );
  let navbarBackdrop = "blur(21px)";
  let navbarPosition = "fixed";

  if (secondary) {
    navbarIcon = "white";
    navbarBg = "none";
    navbarBorder = "none";
    navbarShadow = "initial";
    navbarFilter = "initial";
    navbarBackdrop = "none";
    mainText = "white";
    navbarPosition = "absolute";
  }

  return (
    <Flex
      // @ts-ignore
      position={navbarPosition}
      top="16px"
      left="50%"
      transform="translate(-50%, 0px)"
      background={navbarBg}
      border={navbarBorder}
      boxShadow={navbarShadow}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      borderRadius="15px"
      px="16px"
      py="22px"
      mx="auto"
      width="1044px"
      maxW="90%"
      alignItems="center"
    >
      <Flex w="100%" justifyContent={{sm: "start", lg: "space-between"}}>
        <NextLink href="/" passHref key="link-to-home">
          <Link
            display="flex"
            lineHeight="100%"
            fontWeight="bold"
            justifyContent="center"
            alignItems="center"
            color={mainText}
          >
            <Image w="32px" h="32px" me="10px" src="/logo.png" alt=""/>
            <Text fontsize="sm" mt="3px">
              {logoText}
            </Text>
          </Link>
        </NextLink>

        <Box
          ms={{base: "auto", lg: "0px"}}
          display={{base: "flex", lg: "none"}}
        >
          <SidebarResponsive
            logoText={logoText}
            secondary={secondary}
            {...rest}
          />
        </Box>

        <AuthNavbarLinks color={navbarIcon}/>
      </Flex>
    </Flex>
  );
};

export default AuthNavbar;
