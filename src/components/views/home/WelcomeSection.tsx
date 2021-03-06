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
 * @file: Exports WelcomeSection component used on home page
 **/
import {Box, Button, chakra, Flex, Icon, Image, Link, Text, useColorModeValue} from "@chakra-ui/react";
import NextLink from "next/link";


export default function WelcomeSection() {
  const headingColor = useColorModeValue("gray.900", 'gray.100');
  const descColor = useColorModeValue("gray.600", 'gray.300');

  return (
    <Box
      px={{base: 2, sm: 8}} py={{sm: 16, md: 24}}
      pb={{sm: 8, md: 12, lg: 24}}
      mx="auto" mt={{base: "80px", sm: "32px"}}
      id="welcome-section"
    >
      <Box
        w={{base: "full", md: 11 / 12, xl: 9 / 12}}
        mx="auto"
        textAlign={{base: "left", md: "center"}}
      >
        <chakra.h1
          mb={6}
          fontSize={{base: "4xl", md: "6xl"}}
          fontWeight="bold"
          lineHeight="none"
          letterSpacing={{base: "normal", md: "tight"}}
          color={headingColor}
        >
          Stay{" "}

          <Text
            display={{base: "block", lg: "inline"}}
            w="full"
            bgClip="text"
            bgGradient="linear(to-r, green.400,purple.500)"
            fontWeight="extrabold"
          >
            safe and sound
          </Text>{" "}
          with Bowell
        </chakra.h1>

        <chakra.p
          px={{base: 0, lg: 24}}
          mb={2}
          fontSize={{base: "lg", md: "xl"}}
          color={descColor}
          textTransform="none"
        >
          Built and designed by passionate developers with simplicity and user experience in mind,
          for the benefit of patients and doctors.
        </chakra.p>

        <chakra.p
          px={{base: 0, lg: 24}} mb={6}
          fontSize={{base: "lg", md: "xl"}}
          color={descColor}
          textTransform="none"
        >
          Manage patients, examinations, recordings and perform bowel analysis like nowhere else.
        </chakra.p>

        <Flex
          direction={{base: "column", md: "row"}}
          mb={{base: 4, md: 8}}
          justifyContent={{sm: "left", md: "center"}}
        >
          <NextLink passHref href="#welcome-section-image">
            <Link>
              <Button
                variant="solid"
                colorScheme="teal"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                w={{base: "full", sm: "auto"}}
                mb={{base: 2, sm: 2, md: 0}}
                mx={{base: 0, md: 2}}
                size="lg"
                cursor="pointer"
                leftIcon={
                  <Icon boxSize={4} ml={1} viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </Icon>
                }
              >
                Get Started
              </Button>
            </Link>
          </NextLink>

          <NextLink passHref href="/login">
            <Link>
              <Button
                variant="solid"
                colorScheme="gray"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                w={{base: "full", sm: "auto"}}
                mb={{base: 2, sm: 2, md: 0}}
                mx={{base: 0, md: 2}}
                size="lg"
                cursor="pointer"
                leftIcon={
                  <Icon boxSize={4} ml={1} viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </Icon>
                }
              >
                Go To Dashboard
              </Button>
            </Link>
          </NextLink>
        </Flex>
      </Box>

      <Flex
        w={{base: "full", md: 10 / 12}}
        mx="auto"
        mt={{base: 10, sm: 12, md: 20}}
        textAlign="center"
        justifyContent="center"
        id="welcome-section-image"
        mb={{base: 8, md: 0}}
      >
        <Image
          w="full"
          maxW="1920px"
          maxH="1080px"
          rounded="lg"
          shadow="2xl"
          src="/assets/hero_dashboard_lightmode.jpg"
          alt=""
        />
      </Flex>
    </Box>
  );
};
