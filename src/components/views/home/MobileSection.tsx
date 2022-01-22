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
 * @file: Exports MobileSection component used on home page
 **/
import {Box, chakra, Flex, Image, useColorModeValue} from "@chakra-ui/react";
import {useState} from "react";

const images = [
  "/assets/phone_view_1.png",
  "/assets/phone_view_2.png",
  "/assets/phone_view_3.png",
  "/assets/phone_view_4.png",
  "/assets/phone_view_5.png",
];

export default function MobileSection() {
  const [currentDotIndex, setCurrentDotIndex] = useState<number>(0);

  const bg = useColorModeValue("gray.200", "gray.500");
  const bgActive = useColorModeValue("gray.600", "white");
  const titleColor = useColorModeValue("gray.700", "white");
  const subtitleColor = useColorModeValue("teal.500", "teal.500");
  const descColor = useColorModeValue("gray.400", "gray.300");

  return (
    <Flex
      direction={{base: "column", md: "row"}}
      pt={{sm: 8, md: 12, lg: 16}}
      pb={{sm: 8, md: 16}}
      px={{base: 2, sm: 8, md: 16}}
      mx="auto"
      id="mobile-section"
    >
      <Box
        w={{base: "full", md: 11 / 12, xl: 9 / 12}}
        mx="auto"
        pr={{md: 20}}
        pb={{sm: 8, md: 0}}
        color="black"
        display="flex"
        alignItems="center"
      >
        <Box>
          <chakra.h2
            fontSize={{base: "3xl", sm: "4xl"}}
            fontWeight="extrabold"
            lineHeight="shorter"
            color={titleColor}
            mb={6}
          >
            <chakra.span display="block">Mobile friendly</chakra.span>
            <chakra.span
              display="block"
              color={subtitleColor}
            >
              Access our website from any device
            </chakra.span>
          </chakra.h2>

          <chakra.p
            mb={6}
            fontSize={{base: "lg", md: "xl"}}
            color={descColor}
            textTransform="none"
          >
            Responsive design enables doctors and patients to log in on smartphone, tablet as well as
            computer or laptop without any inconveniences.
          </chakra.p>

          <chakra.p
            mb={6}
            fontSize={{base: "lg", md: "xl"}}
            color={descColor}
            textTransform="none"
          >
            Adapted access to information and improved readability enables you to check out your profile
            and examinations. No matter where you are, Bowell is next to you to support!
          </chakra.p>
        </Box>
      </Box>

      <Flex
        w={{sm: "full", md: 10 / 12}}
        mx="auto" textAlign="center"
        justifyContent="center"
        flexDirection={{base: 'column', md: 'row'}}
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          pb={{base: 4, md: 0}}
          id="phone-container"
        >
          <Image
            maxH="600px"
            h={{base: "350px", sm: "400px", md: "450px", lg: "600px"}}
            w="auto"
            src={images[currentDotIndex]}
            alt=""
          />
        </Flex>

        <Flex
          className="dots"
          flexDirection={{base: 'row', md: 'column'}}
          alignItems="center"
          justifyContent="center"
          px={2}
        >
          {images.map((image, idx) => (
            <Box
              className="dot"
              display="inline-flex"
              postion="relative"
              m="5px"
              cursor="pointer"
              w={{base: "30px", md: "10px"}}
              h={{base: "10px", md: "30px"}}
              onClick={() => setCurrentDotIndex(idx)}
              bg={currentDotIndex === idx ? bgActive : bg}
              key={`phone-image-${idx}`}
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
