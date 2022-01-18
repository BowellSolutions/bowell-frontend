/**
 * @author: Adam Lisichin
 * @file: Exports WelcomeSection component used on home page
 **/
import {Box, Button, chakra, Flex, Icon, Image, Link, Stack, Text, useColorModeValue} from "@chakra-ui/react";
import NextLink from "next/link";


export default function WelcomeSection() {
  return (
    <Box
      px={8} py={{sm: 16, md: 24}}
      pb={{sm: 8, md: 12, lg: 24}}
      mx="auto" mt={{base: "32px"}}
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
          color={useColorModeValue("gray.900", 'gray.100')}
        >
          Lorem{" "}

          <Text
            display={{base: "block", lg: "inline"}}
            w="full"
            bgClip="text"
            bgGradient="linear(to-r, green.400,purple.500)"
            fontWeight="extrabold"
          >
            consectetur adipiscing
          </Text>{" "}
          at edit ipsum lorem.
        </chakra.h1>

        <chakra.p
          px={{base: 0, lg: 24}}
          mb={6}
          fontSize={{base: "lg", md: "xl"}}
          color={useColorModeValue("gray.600", 'gray.300')}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consectetur et ex a facilisis. Vestibulum ante
          ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Vestibulum mi magna, placerat id.
        </chakra.p>

        <Stack
          direction={{base: "column", sm: "row"}}
          mb={{base: 4, md: 8}}
          spacing={2}
          justifyContent={{sm: "left", md: "center"}}
        >
          <NextLink passHref href="#welcome-section-image">
            <Link>
              <Button
                as="a"
                variant="solid"
                colorScheme="teal"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                w={{base: "full", sm: "auto"}}
                mb={{base: 2, sm: 0}}
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

          <NextLink href="/login" passHref>
            <Link>
              <Button
                as="a"
                colorScheme="gray"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                w={{base: "full", sm: "auto"}}
                mb={{base: 2, sm: 0}}
                size="lg"
                cursor="pointer"
              >
                Go To Dashboard
              </Button>
            </Link>
          </NextLink>
        </Stack>
      </Box>

      <Flex
        w={{base: "full", md: 10 / 12}}
        mx="auto"
        mt={20}
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
          alt="Dashboard screenshot"
        />
      </Flex>
    </Box>
  );
};
