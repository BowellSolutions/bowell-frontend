/**
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

  return (
    <Flex
      direction={{base: "column", md: "row"}}
      pt={{sm: 8, md: 12, lg: 16}}
      pb={{sm: 8, md: 16}}
      px={{sm: 8, md: 16}}
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
            color={useColorModeValue("gray.700", "white")}
            mb={6}
          >
            <chakra.span display="block">Mobile friendly</chakra.span>
            <chakra.span
              display="block"
              color={useColorModeValue("teal.500", "teal.500")}
            >
              Access our website from any device
            </chakra.span>
          </chakra.h2>

          <chakra.p
            mb={6}
            fontSize={{base: "lg", md: "xl"}}
            color={useColorModeValue("gray.400", "gray.300")}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut placerat hendrerit odio, convallis feugiat elit
            congue sed. Cras interdum diam erat, sed blandit quam sodales sed. Integer et urna quis libero facilisis
            vestibulum id id orci.
          </chakra.p>

          <chakra.p
            mb={6}
            fontSize={{base: "lg", md: "xl"}}
            color={useColorModeValue("gray.400", "gray.300")}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut placerat hendrerit odio, convallis feugiat elit
            congue sed. Cras interdum diam erat, sed blandit quam sodales sed. Integer et urna quis libero facilisis
            vestibulum id id orci.
          </chakra.p>
        </Box>
      </Box>

      <Box
        w={{sm: "full", md: 10 / 12}}
        mx="auto" textAlign="center"
        display="flex"
        justifyContent="center"
        flexDirection={{sm: 'column', md: 'row'}}
      >
        <Flex justifyContent="center" pb={{sm: 4, md: 0}} id="phone-container">
          <Image
            maxH="600px"
            h={{sm: "400px", md: "450px", lg: "600px"}}
            w="auto"
            src={images[currentDotIndex]}
            alt=""
          />
        </Flex>


        <Box
          className="dots"
          flexDirection={{sm: 'row', md: 'column'}}
          px={2}
        >
          {images.map((image, idx) => (
            <Box
              className="dot"
              onClick={() => setCurrentDotIndex(idx)}
              bg={currentDotIndex === idx ? bgActive : bg}
              key={`phone-image-${idx}`}
            />
          ))}
        </Box>
      </Box>
    </Flex>
  );
}
