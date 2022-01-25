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
 * @file: Exports HeaderSection component used on home page
 **/
import {
  Box,
  Button,
  chakra,
  CloseButton,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Link,
  SimpleGrid,
  Spacer,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import {AiFillHome, AiOutlineMenu,} from "react-icons/ai";
import {BsFillVolumeUpFill, BsPerson, BsPersonFill, BsVolumeUp} from "react-icons/bs";
import {FaMoon, FaSun} from "react-icons/fa";
import {IoIosArrowDown, IoIosRocket} from "react-icons/io";
import {useDisclosure} from "@chakra-ui/hooks";
import {FC, ReactNode} from "react";
import {BiReceipt} from "react-icons/bi";
import NextLink from "next/link";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {MdLogin, MdLogout, MdOutlineDashboard, MdOutlineMore} from "react-icons/md";
import {logoutUser} from "../../../redux/actions/auth";

interface SectionProps {
  title: string,
  icon: JSX.Element,
  children: ReactNode,
  href?: string,
}

const Section: FC<SectionProps> = ({href, icon, title, children}) => {
  const hoverBgColor = useColorModeValue("gray.50", "gray.700");
  const titleColor = useColorModeValue("gray.900", "gray.50");
  const descColor = useColorModeValue("gray.500", "gray.50");

  return (
    <NextLink href={href ?? "/"} passHref>
      <Link
        m={-3}
        p={3}
        display="flex"
        alignItems="start"
        rounded="lg"
        _hover={{bg: hoverBgColor}}
      >
        <chakra.svg
          flexShrink={0}
          h={6}
          w={6}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          {icon}
        </chakra.svg>
        <Box ml={4}>
          <chakra.p fontSize="sm" fontWeight="700" color={titleColor}>
            {title}
          </chakra.p>
          <chakra.p mt={1} fontSize="sm" color={descColor} textTransform="none">
            {children}
          </chakra.p>
        </Box>
      </Link>
    </NextLink>
  );
};

const Features: FC = () => {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <>
      <SimpleGrid
        columns={{base: 1, md: 3, lg: 5}}
        pos="relative"
        gap={{base: 6, sm: 8}}
        px={5}
        py={6}
        p={{sm: 8}}
        bg={bg}
      >
        <Section
          title="Dashboard"
          icon={
            <Icon as={MdOutlineDashboard} fontSize="1.5em"/>
          }
          href="/dashboard/"
        >
          {"Feature rich dashboard with different interfaces for patients and doctors"}
        </Section>

        <Section
          title="Examinations"
          icon={
            <Icon as={BiReceipt} fontSize="1.5em"/>
          }
          href="/dashboard/examinations"
        >
          {"Medical examinations gathered in one place and designed with user experience in mind"}
        </Section>

        <Section
          title="Recordings"
          icon={
            <Icon as={BsVolumeUp} fontSize="1.5em"/>
          }
          href="/dashboard/recordings"
        >
          {"Upload wav files and analyze them with machine learning model provided by our experts"}
        </Section>

        <Section
          title="Profile"
          icon={
            <Icon as={BsPerson} fontSize="1.5em"/>
          }
          href="/dashboard/profile"
        >
          {"Profiles with user specific data. " +
          "Recent examinations and patients displayed in doctor's perspective"}
        </Section>

        <Section
          title="More Features"
          icon={
            <Icon as={MdOutlineMore} fontSize="1.5em"/>
          }
          href="#features-section"
        >
          {"Learn more about Bowell's features"}
        </Section>
      </SimpleGrid>
    </>
  );
};


export default function HeaderSection() {
  const mobileNav = useDisclosure();
  const {toggleColorMode: toggleMode} = useColorMode();
  const bg = useColorModeValue("white", "gray.800");
  const cl = useColorModeValue("gray.800", "white");
  const dropdownBg = useColorModeValue("white", "gray.700");
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const logout = () => () => dispatch(logoutUser());

  const MobileNavContent = (
    <VStack
      pos="absolute"
      top={0}
      left={0}
      right={0}
      display={mobileNav.isOpen ? "flex" : "none"}
      flexDirection="column"
      p={4}
      bg={dropdownBg}
      spacing={3}
      rounded="sm"
      shadow="sm"
      zIndex={1000}
      id="mobile-nav"
    >
      <CloseButton
        aria-label="Close menu"
        justifySelf="self-start"
        onClick={mobileNav.onClose}
      />

      <NextLink href="/" passHref>
        <Link>
          <Button
            w="full"
            variant="ghost"
            leftIcon={<AiFillHome/>}>
            Home
          </Button>
        </Link>
      </NextLink>

      <NextLink href="/dashboard" passHref>
        <Link>
          <Button
            w="full"
            variant="ghost"
            leftIcon={<MdOutlineDashboard/>}>
            Dashboard
          </Button>
        </Link>
      </NextLink>

      <NextLink href="/dashboard/examinations" passHref>
        <Link>
          <Button
            w="full"
            variant="ghost"
            leftIcon={<BiReceipt/>}
          >
            Examinations
          </Button>
        </Link>
      </NextLink>

      <NextLink href="/dashboard/recordings" passHref>
        <Link>
          <Button
            w="full"
            variant="ghost"
            leftIcon={<BsFillVolumeUpFill/>}
          >
            Recordings
          </Button>
        </Link>
      </NextLink>

      {isAuthenticated ? (
        <>
          <NextLink passHref href="/dashboard/profile">
            <Link>
              <Button w="full" variant="ghost" leftIcon={<BsPersonFill/>}>
                Profile
              </Button>
            </Link>
          </NextLink>

          <Button w="full" variant="ghost" leftIcon={<MdLogout/>} onClick={logout()}>
            Logout
          </Button>
        </>
      ) : <>
        <NextLink passHref href="/login">
          <Link>
            <Button w="full" variant="ghost" leftIcon={<MdLogin/>}>
              Sign in
            </Button>
          </Link>
        </NextLink>

        <NextLink passHref href="/register">
          <Link>
            <Button w="full" variant="ghost" leftIcon={<IoIosRocket/>}>
              Sign up
            </Button>
          </Link>
        </NextLink>
      </>}
    </VStack>
  );

  return (
    <chakra.header
      w="full"
      px={{base: 2, sm: 4, md: 8, lg: 12}}
      py={4}
      bg={bg}
      top={0}
      left={0}
      right={0}
      pos="fixed"
      zIndex={1000}
      className="header"
      shadow="md"
    >
      <Flex alignItems="center" justifyContent="space-between" mx="auto">
        <Link display="flex" alignItems="center" href="/" id="header-logo">
          <Image w="32px" h="32px" me="10px" src="/logo.png" alt=""/>

          <Text mt="3px" className="logo">
            Bowell
          </Text>
        </Link>

        <Spacer/>

        <Box display="flex" alignItems="center">
          <Box display={{base: "none", md: "inline-flex"}}>
            <HStack spacing={1}>
              <Box role="group">
                <Button
                  bg={bg}
                  color="gray.500"
                  alignItems="center"
                  fontSize="md"
                  _hover={{color: cl}}
                  _focus={{boxShadow: "none"}}
                  rightIcon={<IoIosArrowDown/>}
                >
                  Features
                </Button>
                <Box
                  pos="absolute"
                  left={0}
                  w="full"
                  display="none"
                  _groupHover={{display: "block"}}
                >
                  <Features/>
                </Box>
              </Box>
            </HStack>
          </Box>

          <HStack spacing={1} display={{base: "none", md: "flex"}}>
            {isAuthenticated ? (
              <>
                <NextLink passHref href="/dashboard">
                  <Link>
                    <Button colorScheme="teal" variant="ghost" size="sm">
                      Dashboard
                    </Button>
                  </Link>
                </NextLink>

                <NextLink passHref href="/dashboard/profile">
                  <Link>
                    <Button colorScheme="teal" variant="ghost" size="sm">
                      Profile
                    </Button>
                  </Link>
                </NextLink>

                <Button colorScheme="teal" variant="ghost" size="sm" onClick={logout()}>
                  Logout
                </Button>
              </>
            ) : <>
              <NextLink passHref href="/login">
                <Link>
                  <Button colorScheme="teal" variant="ghost" size="sm">
                    Sign in
                  </Button>
                </Link>
              </NextLink>

              <NextLink passHref href="/register">
                <Link>
                  <Button colorScheme="teal" variant="solid" size="sm">
                    Sign up
                  </Button>
                </Link>
              </NextLink>
            </>}
          </HStack>

          <IconButton
            size="md"
            fontSize="lg"
            aria-label={`Switch to ${text} mode`}
            variant="ghost"
            color={cl}
            ml={{base: "0", md: "3"}}
            onClick={toggleMode}
            icon={<SwitchIcon/>}
          />

          <IconButton
            display={{sm: "flex", md: "none"}}
            aria-label="Open menu"
            fontSize="20px"
            color={cl}
            variant="ghost"
            icon={<AiOutlineMenu/>}
            onClick={mobileNav.onOpen}
            id="hamburger-menu"
          />
        </Box>
      </Flex>

      {MobileNavContent}
    </chakra.header>
  );
}
