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
 * @file: Exports Login component used in /login route
 **/
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import NextLink from "next/link";
import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {loginUser, resetRegister} from "../../redux/actions/auth";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useRouter} from "next/router";

const Login: FC = () => {
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  const bgColor = useColorModeValue("white", "gray.700");

  const router = useRouter();

  const dispatch = useAppDispatch();
  const {loading, register_success} = useAppSelector((state) => state.auth);

  const toast = useToast();

  const {values, errors, handleChange, handleBlur, handleSubmit, touched} = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('invalid email address').required('email field is required'),
      password: Yup.string().required('password field is required')
    }),
    onSubmit: (values) => {
      dispatch(
        loginUser({email: values.email, password: values.password})
      ).unwrap().then((res) => {
          router.push('/dashboard').then();
          if (!toast.isActive("success-toast")) {
            toast({
              id: "success-toast",
              description: "Successfully logged in! Redirecting to dashboard...",
              status: "success",
              duration: 3500,
              isClosable: true,
            });
          }
        }
      ).catch(err => {
        // to do better error handling
        const message = err?.detail ? err.detail : "Login failed! Try again...";

        if (!toast.isActive("error-toast")) {
          toast({
            id: "error-toast",
            description: message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      });
    }
  });

  const isFormEmpty = values.email === "" || values.password === "";

  useEffect(() => {
    // reset register_success on mount
    if (dispatch != null && register_success) dispatch(resetRegister());
  }, [dispatch, register_success]);

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
          w={{base: "100%", md: "80%", lg: "62%"}}
        >
          <Flex
            direction="column"
            w="100%"
            background={"transparent"}
            p="48px"
            mt={{md: "32px", lg: "64px"}}
            borderRadius={{sm: "15px", md: "15px 0 0 15px"}}
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
                  id="input-email"
                  borderRadius="15px"
                  fontSize="sm"
                  name="email"
                  type="text"
                  placeholder="Your email address"
                  size="lg"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={Boolean(touched.email && errors.email)}
                />
                {touched.email && errors.email && (
                  <FormHelperText>
                    {errors.email}
                  </FormHelperText>
                )}

                <FormLabel ms="4px" fontSize="sm" fontWeight="normal" mt="24px">
                  Password*
                </FormLabel>
                <Input
                  id="input-password"
                  borderRadius="15px"
                  fontSize="sm"
                  type="password"
                  name="password"
                  placeholder="Your password"
                  size="lg"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={Boolean(touched.password && errors.password)}
                />
                {touched.password && errors.password && (
                  <FormHelperText>
                    {errors.password}
                  </FormHelperText>
                )}

                <Flex mt="36px"/>

                <Button
                  fontSize="12px"
                  type="submit"
                  bg="teal.400"
                  w="100%"
                  h="45"
                  mb="20px"
                  color="white"
                  mt="20px"
                  sx={{
                    "&:hover": {
                      bg: "teal.300",
                    },
                    "&:active": {
                      bg: "teal.500",
                    }
                  }}
                  isLoading={loading}
                  loadingText="Submitting"
                  isDisabled={isFormEmpty}
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

        <Flex
          display={{sm: "none", md: "flex"}}
          bgImage="/assets/doctors_2.jpeg"
          bgPosition="center center"
          bgSize="cover"
          w="full"
          mt={{md: "32px", lg: "64px"}}
          borderRadius="0 15px 15px 0"
        />
      </Flex>
    </Flex>
  );
};

export default Login;
