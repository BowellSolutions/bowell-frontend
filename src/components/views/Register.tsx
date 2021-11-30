import {Button, Flex, FormControl, FormLabel, Heading, Input, Link, Text, useColorModeValue,} from "@chakra-ui/react";
import {FC} from "react";
import NextLink from "next/link";


const Register: FC = () => {
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  const bgColor = useColorModeValue("white", "gray.700");

  // to do, switch between patient and doctor registration
  // sending request

  return (
    <Flex
      direction="column"
      alignSelf="center"
      justifySelf="center"
      overflow="hidden"
    >
      <Flex
        direction="column"
        textAlign="center"
        justifyContent="center"
        align="center"
        mt="6.5rem"
        mb="30px"
      />

      <Flex alignItems="center" justifyContent="center" mb="60px">
        <Flex
          direction="column"
          w="100%"
          maxW="445px"
          background={"transparent"}
          borderRadius="15px"
          p="40px"
          mx={{base: "100px", sm: "auto"}}
          bg={bgColor}
          boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
          textAlign="center"
        >
          <Heading color={titleColor} fontSize="32px" mb="24px">
            Join Us
          </Heading>

          <FormControl>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              First Name*
            </FormLabel>
            <Input
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="text"
              placeholder="Your first name"
              mb="24px"
              size="lg"
            />

            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Last Name*
            </FormLabel>
            <Input
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="text"
              placeholder="Your last name"
              mb="24px"
              size="lg"
            />

            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Email*
            </FormLabel>
            <Input
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="email"
              placeholder="Your email address"
              mb="24px"
              size="lg"
            />

            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Password*
            </FormLabel>
            <Input
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="password"
              placeholder="Your password"
              mb="24px"
              size="lg"
            />

            <Button
              type="submit"
              bg="teal.400"
              fontSize="12px"
              fontWeight="bold"
              color="white"
              w="100%"
              h="45"
              mb="24px"
              sx={{
                "&:hover": {
                  bg: "teal.300",
                },
                "&:active": {
                  bg: "teal.500",
                }
              }}
              loadingText="Submitting"
            >
              SIGN UP
            </Button>
          </FormControl>

          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColor} fontWeight="medium">
              Already have an account?
              <NextLink href="/login">
                <Link
                  color={titleColor}
                  as="span"
                  ms="5px"
                  href="#"
                  fontWeight="bold"
                >
                  Sign In
                </Link>
              </NextLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Register;
