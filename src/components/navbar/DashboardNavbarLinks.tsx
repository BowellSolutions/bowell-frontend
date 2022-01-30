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
 * @file: Exports DashboardNavbarLinks component - links rendered in DashboardNavbar
 **/
import {Button, Flex, Icon, Link, useColorModeValue, useToast} from "@chakra-ui/react";
import NextLink from "next/link";
import {FC, useRef} from "react";
import {BsFillPersonFill} from "react-icons/bs";
import {IoMdSettings} from "react-icons/io";
import SidebarResponsive from "../sidebar/SidebarResponsive";
import Notifications from "../menu/Notifications";
import {logoutUser} from "../../redux/actions/auth";
import {useAppDispatch} from "../../redux/hooks";
import {useRouter} from "next/router";

interface DashboardNavbarLinksProps {
  logoText: string,
  variant?: string,
  fixed: boolean,
  secondary: boolean,
  onOpen: () => void,
}

const DashboardNavbarLinks: FC<DashboardNavbarLinksProps> = (
  {
    logoText,
    variant,
    children,
    fixed,
    secondary,
    onOpen,
    ...rest
  }) => {

  const router = useRouter();
  const dispatch = useAppDispatch();

  const grayLinkColor = useColorModeValue("gray.500", "gray.200");
  const navbarLinkColor = secondary ? "white" : grayLinkColor;

  const toast = useToast();

  const logout = (): void => {
    dispatch(logoutUser()).unwrap().then(async () => {
      toast({
        id: "success-logout-toast",
        description: "Successfully logged out!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      await router.push("/");
    }).catch(() => {
      toast({
        id: "error-logout-toast",
        description: "Failed to log out!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });
  };

  const settingsRef = useRef(null);

  return (
    <Flex
      pe={{sm: "0px", md: "16px"}}
      w={{sm: "100%", md: "auto"}}
      alignItems="center"
      flexDirection="row"
    >
      <Flex flexGrow={1}/>

      <Button
        ms={0}
        px={0}
        p="8px"
        mr={{base: 0, md: "16px"}}
        d={{base: "none", md: "block"}}
        color={navbarLinkColor}
        variant="ghost"
        colorScheme="teal"
        onClick={logout}
      >
        Logout
      </Button>

      <NextLink href="/dashboard/profile" passHref>
        <Link display="flex">
          <Icon
            as={BsFillPersonFill}
            w="22px"
            h="22px"
            mx="0px"
            px="0px"
            me={{sm: "16px", lg: "8px"}}
            color={navbarLinkColor}
            cursor="pointer"
          />
        </Link>
      </NextLink>

      <SidebarResponsive
        logoText={logoText}
        secondary={secondary}
        {...rest}
      />

      <Icon
        as={IoMdSettings}
        w="22px"
        h="22px"
        me={{sm: "16px", lg: "4px"}}
        ref={settingsRef}
        onClick={onOpen}
        color={navbarLinkColor}
        cursor="pointer"
      />

      <Notifications color={navbarLinkColor}/>
    </Flex>
  );
};

export default DashboardNavbarLinks;
