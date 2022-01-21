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
 * @file: Exports CallToActionSection component used on home page
 **/
import {Box, chakra, Flex, SimpleGrid, Stack, useColorModeValue} from "@chakra-ui/react";
import HomeFooter from "./HomeFooter";
import NextLink from "next/link";
import {FC} from "react";


const CallToActionSection: FC = () => {
  const headingColor = useColorModeValue("gray.900", "gray.100");
  const bgColor = useColorModeValue("", "gray.700");
  const btnTextColor = useColorModeValue("white", "");
  const btnBgColor = useColorModeValue("teal.600", "teal.500");
  const btnHoverBgColor = useColorModeValue("teal.700", "teal.600");

  return (
    <Flex
      w="full"
      alignItems="center"
      justifyContent="center"
      shadow="xl"
      id="cta-section"
    >
      <Box
        w="full"
        bgGradient="linear(to-r, white, teal.300)"
        bg={bgColor}
        shadow="xl"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <SimpleGrid
          w={{md: "3xl", lg: "4xl"}}
          alignItems="center"
          columns={{base: 1, lg: 2, xl: 3}}
          spacing={4}
          mx="auto"
          py={{base: 8, lg: 16}}
          px={{base: 4, lg: 8}}
          display={{lg: "flex"}}
        >
          <Box>
            <chakra.h3
              fontSize={{base: "3xl", sm: "4xl"}}
              fontWeight="extrabold"
              letterSpacing="tight"
              lineHeight="shorter"
              color={headingColor}
              mb={6}
            >
              <chakra.span display="block">Do not wait!</chakra.span>
              <chakra.span
                display="block"
                color={useColorModeValue("", "gray.500")}
              >
                Try out our service for free.
              </chakra.span>
            </chakra.h3>

            <Stack direction={{base: "column", sm: "row"}} spacing={2}>
              <Box display="inline-flex" rounded="md" shadow="md">
                <NextLink passHref href="/login">
                  <chakra.a
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    px={5}
                    py={3}
                    border="solid transparent"
                    fontWeight="bold"
                    w="full"
                    rounded="md"
                    cursor="pointer"
                    color={btnTextColor}
                    bg={btnBgColor}
                    _hover={{
                      bg: btnHoverBgColor,
                    }}
                  >
                    Get Started
                  </chakra.a>
                </NextLink>
              </Box>
            </Stack>
          </Box>
        </SimpleGrid>

        <HomeFooter/>
      </Box>
    </Flex>
  );
};

export default CallToActionSection;
