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
 * @file: Exports SidebarResponsiveLinks component - mobile sidebar in dashboard
 **/
import {FC, ReactNode, useRef} from "react";
import {Separator} from "../utils/Separator";
import {HamburgerIcon} from "@chakra-ui/icons";
import {useDisclosure} from "@chakra-ui/hooks";
import NextLink from "next/link";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import SidebarResponsiveLinks from "./SidebarResponsiveLinks";

interface SidebarResponsiveProps {
  logoText: string,
  secondary: boolean,
  children?: ReactNode
}

const SidebarResponsive: FC<SidebarResponsiveProps> = (
  {logoText, secondary}
) => {
  const mainPanel = useRef(null);

  const grayColor = useColorModeValue("gray.500", "gray.200");
  const hamburgerColor = secondary ? "white" : grayColor;

  const {isOpen, onOpen, onClose} = useDisclosure();
  const btnRef = useRef(null);

  return (
    <Flex
      display={{sm: "flex", xl: "none"}}
      alignItems="center"
      ref={mainPanel}
    >
      <Icon
        as={HamburgerIcon}
        color={hamburgerColor}
        w="22px"
        h="22px"
        me={{sm: "16px", lg: "8px"}}
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
        cursor="pointer"
        id="dashboard-hamburger-menu"
      />

      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="left"
        finalFocusRef={btnRef}
      >
        <DrawerOverlay/>

        <DrawerContent
          w="250px"
          maxW="250px"
          borderRadius="8px"
        >
          <DrawerCloseButton
            _focus={{boxShadow: "none"}}
            _hover={{boxShadow: "none"}}
          />

          <DrawerBody maxW="250px" px="1rem">
            <Box maxW="100%" h="calc(100vh-1rem)">
              <Box>
                <Box pt="35px" mb="8px">
                  <NextLink href="/" passHref key="link-to-homepage">
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
                <SidebarResponsiveLinks/>
              </Stack>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default SidebarResponsive;
