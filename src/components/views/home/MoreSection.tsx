import {Box, Button, chakra, Flex, Image, SimpleGrid, useColorModeValue} from "@chakra-ui/react";
import NextLink from "next/link";

export default function MoreSection() {
  return (
    <Flex
      px={{sm: 8, md: 12, lg: 16}}
      pt={{sm: 16, lg: 20}}
      pb={{sm: 4, md: 20}}
      w="full"
      justifyContent="center"
      alignItems="center"
      id="more-section"
    >
      <Box mx="auto">
        <SimpleGrid
          alignItems="start"
          columns={{base: 1, md: 1, lg: 2}}
          mb={{base: 24, sm: 16}}
          spacingY={{base: 10, md: 12}}
          spacingX={{base: 10, md: 24}}
        >
          <Box>
            <chakra.h2
              mb={4}
              fontSize={{base: "2xl", md: "4xl"}}
              fontWeight="extrabold"
              letterSpacing="tight"
              textAlign={{base: "center", sm: "left", md: "left"}}
              color={useColorModeValue("gray.900", "gray.400")}
              lineHeight={{md: "shorter"}}
            >
              Designed for solving real life problems
            </chakra.h2>

            <chakra.p
              mb={5}
              textAlign={{base: "center", sm: "left"}}
              color={useColorModeValue("gray.600", "gray.400")}
              fontSize={{md: "lg"}}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consectetur et ex a facilisis. Vestibulum
              ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum mi magna, placerat
              id.
            </chakra.p>

            <chakra.p
              textAlign={{base: "center", sm: "left"}}
              color={useColorModeValue("gray.600", "gray.400")}
              fontSize={{md: "lg"}}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus leo arcu, dapibus varius orci vitae,
              cursus consequat erat. Integer porta odio pulvinar, suscipit nisi nec, malesuada velit. Donec ut porta
              tortor. Sed.
            </chakra.p>
          </Box>

          <Image
            mx={{base: 0, md: "auto"}}
            maxW={{md: 800, lg: "none"}}
            w="full"
            h="full"
            src="/assets/examination_1.jpg"
            alt=""
          />
        </SimpleGrid>

        <SimpleGrid
          alignItems="center"
          columns={{base: 1, md: 1, lg: 2}}
          flexDirection="column-reverse"
          mb={{base: 24, md: 16}}
          spacingY={{base: 10, md: 12}}
          spacingX={{base: 10, md: 24}}
        >
          <Box order={{md: 2}}>
            <chakra.h2
              mb={4}
              fontSize={{base: "2xl", md: "4xl"}}
              fontWeight="extrabold"
              letterSpacing="tight"
              textAlign={{base: "center", md: "left"}}
              color={useColorModeValue("gray.900", "gray.400")}
              lineHeight={{md: "shorter"}}
            >
              Made in cooperation with AI Experts
            </chakra.h2>

            <chakra.p
              mb={5}
              textAlign={{base: "center", sm: "left"}}
              color={useColorModeValue("gray.600", "gray.400")}
              fontSize={{md: "lg"}}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus leo arcu, dapibus varius orci vitae,
              cursus consequat erat. Integer porta odio pulvinar, suscipit nisi nec, malesuada velit. Donec ut porta
              tortor. Sed.
            </chakra.p>

            <chakra.p
              mb={5}
              textAlign={{base: "center", sm: "left"}}
              color={useColorModeValue("gray.600", "gray.400")}
              fontSize={{md: "lg"}}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus leo arcu, dapibus varius orci vitae,
              cursus consequat erat. Integer porta odio pulvinar, suscipit nisi nec, malesuada velit. Donec ut porta
              tortor. Sed.
            </chakra.p>

            <NextLink passHref href="http://ai.ii.pw.edu.pl/">
              <Button
                w={{base: "full", sm: "auto"}}
                size="lg"
                bg={useColorModeValue("gray.900", "gray.700")}
                _hover={{bg: useColorModeValue("gray.700", "gray.600")}}
                color={useColorModeValue("gray.100", "gray.200")}
                as="a"
                cursor="pointer"
              >
                Learn More
              </Button>
            </NextLink>
          </Box>

          <Image
            mx={{base: 0, md: "auto"}}
            w="full"
            h="full"
            maxW={{md: 800, lg: "none"}}
            src="/assets/doctors_1.jpg"
            alt=""
          />
        </SimpleGrid>
      </Box>
    </Flex>
  );
}
