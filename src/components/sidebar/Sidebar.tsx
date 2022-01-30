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
 * @file: Exports Sidebar component - sidebar in dashboard
 **/
import {FC, useRef} from "react";
import {Separator} from "../utils/Separator";
import {Box, Image, Link, Stack, Text, useColorModeValue} from "@chakra-ui/react";
import NextLink from "next/link";
import type {UserType} from "../layouts/DashboardLayout";
import SidebarLinks from "./SidebarLinks";

interface SidebarProps {
  logoText: string,
  display: string,
  sidebarVariant: string,
  user: UserType
}

const Sidebar: FC<SidebarProps> = ({logoText, display, sidebarVariant, user}) => {
  const mainPanel = useRef(null);

  const variantChange = "0.2s linear";
  const sidebarBgOpaque = useColorModeValue("white", "gray.700");

  let sidebarBg = "none";
  let sidebarRadius = "0px";
  let sidebarMargins = "0px";
  if (sidebarVariant === "opaque") {
    sidebarBg = sidebarBgOpaque;
    sidebarRadius = "16px";
    sidebarMargins = "16px 0px 16px 16px";
  }

  return (
    <Box ref={mainPanel}>
      <Box display={{sm: "none", xl: "block"}} position="fixed">
        <Box
          bg={sidebarBg}
          transition={variantChange}
          w="260px"
          maxW="260px"
          ms={{
            sm: "16px",
          }}
          my={{
            sm: "16px",
          }}
          h="calc(100vh - 32px)"
          ps="20px"
          pe="20px"
          m={sidebarMargins}
          borderRadius={sidebarRadius}
        >
          <Box>
            <Box pt={"25px"} mb="12px">
              <NextLink href="/" passHref key="link-to-home">
                <Link
                  display="flex"
                  lineHeight="100%"
                  mb="30px"
                  fontWeight="bold"
                  justifyContent="center"
                  alignItems="center"
                  fontSize="11px"
                >
                  <Image w="32px" h="32px" me="10px" src="/logo.png" alt=""/>
                  <Text fontSize="sm" mt="3px">
                    {logoText}
                  </Text>
                </Link>
              </NextLink>
              <Separator/>
            </Box>
          </Box>
          <Stack direction="column" mb="40px">
            <Box>
              <SidebarLinks
                sidebarVariant={sidebarVariant}
                user={user}
              />
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
