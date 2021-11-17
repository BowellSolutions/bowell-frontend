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
import NextLink from "next/link";
import {ChangeEvent, FC, FormEvent, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../redux/hooks";
import {loginUser, resetRegister} from "../../redux/actions/auth";


const Login: FC = () => {
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  const bgColor = useColorModeValue("white", "gray.700");

  const dispatch = useDispatch();
  const loading = useAppSelector((state) => state.auth.loading);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(username, password));
  };

  useEffect(() => {
    // reset register_success on mount
    if (dispatch != null) dispatch(resetRegister());
  }, [dispatch]);

  return (
    <Flex position="relative" mb="40px">
      <Flex
        w="100%"
        maxW="1044px"
        mx={{sm: "24px", lg: "auto"}}
        justifyContent="space-between"
        mb="30px"
        mt={{sm: "120px"}}
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
            mt={{md: "32px", lg: "64px"}}
            borderRadius="15px"
            bg={bgColor}
            boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
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
                {"Don't have an account?"}
                <NextLink href="/register">
                  <Link color={titleColor} as="span" ms="5px" fontWeight="bold">
                    Sign Up
                  </Link>
                </NextLink>
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
