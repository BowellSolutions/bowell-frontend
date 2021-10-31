import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, {FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducers";
import {loginUser, resetRegisterSuccess} from "../../redux/actions/auth";


const Login: FC = () => {
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");

  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.auth.loading);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleInputChange = (e: React.BaseSyntheticEvent) => {
    switch (e.target.name) {
      case 'email':
        setUsername(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(username, password));
  };

  useEffect(() => {
    // reset register_success on mount
    if (dispatch != null) dispatch(resetRegisterSuccess());
  }, [dispatch]);

  return (
    <Flex position="relative" mb="40px">
      <Flex
        h={{sm: "initial", md: "75vh", lg: "85vh"}}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{sm: "100px", md: "0px"}}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{userSelect: "none"}}
          w={{base: "100%", md: "50%", lg: "42%"}}
        >
          <Flex
            direction="column"
            w="100%"
            background={"transparent"}
            p="48px"
            mt={{md: "150px", lg: "80px"}}
          >
            <Heading color={titleColor} fontSize="32px" mb="10px">
              Welcome Back
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color={textColor}
              fontWeight="bold"
              fontSize="14px"
            >
              Enter your email and password to sign in
            </Text>

            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Email*
                </FormLabel>
                <Input
                  borderRadius="15px"
                  mb="24px"
                  fontSize="sm"
                  name="email"
                  type="text"
                  placeholder="Your email adress"
                  size="lg"
                  onChange={handleInputChange}
                />

                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Password*
                </FormLabel>
                <Input
                  borderRadius="15px"
                  mb="36px"
                  fontSize="sm"
                  type="password"
                  name="password"
                  placeholder="Your password"
                  size="lg"
                  onChange={handleInputChange}
                />

                <Button
                  fontSize="12px"
                  type="submit"
                  bg="teal.300"
                  w="100%"
                  h="45"
                  mb="20px"
                  color="white"
                  mt="20px"
                  sx={{
                    "&:hover": {
                      bg: "teal.200",
                    },
                    "&:active": {
                      bg: "teal.400",
                    }
                  }}
                  isLoading={loading}
                  loadingText="Submitting"
                >
                  SIGN IN
                </Button>
              </FormControl>
            </form>

            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
            >
              <Text color={textColor} fontWeight="medium">
                Don&apost have an account?
                <Link color={titleColor} as="span" ms="5px" fontWeight="bold">
                  Sign Up
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Box
          display={{base: "none", md: "block"}}
          overflowX="hidden"
          h="100%"
          w="40vw"
          position="absolute"
          right="0px"
        >
          <Box
            // bgImage={signInImage}
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius="20px"
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Login;
