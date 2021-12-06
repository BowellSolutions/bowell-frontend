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
