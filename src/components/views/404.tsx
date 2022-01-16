/**
 * @author: Adam Lisichin
 * @file: Exports PageNotFound which is rendered by Next.js whenever it throws 404
 **/
import {FC} from "react";
import {Box, Button, Heading, Text} from "@chakra-ui/react";
import NextLink from "next/link";

const PageNotFound: FC = () => {
  return (
    <Box textAlign="center" py={10} px={6} id="page-not-found">
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
      >
        404
      </Heading>

      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>

      <Text color="gray.500" mb={6} textTransform="none">
        {"The page you're looking for does not seem to exist"}
      </Text>

      <NextLink href="/" passHref>
        <Button
          colorScheme="teal"
          bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
          color="white"
          variant="solid"
        >
          Go to Home
        </Button>
      </NextLink>
    </Box>
  );
};

export default PageNotFound;
