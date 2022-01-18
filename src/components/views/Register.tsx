/**
 * @author: Adam Lisichin
 * @file: Exports Register component used in /register route
 **/
import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
  Radio,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import {FC, useState} from "react";
import NextLink from "next/link";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useRouter} from "next/router";
import {resetRegisterSuccess} from "../../redux/reducers/auth";
import {registerUser} from "../../redux/actions/auth";
import {Formik} from "formik";
import * as Yup from "yup";
import {RadioGroupControl} from "formik-chakra-ui";

const today = new Date();

const validationSchema = Yup.object({
  user_type: Yup.string().matches(/DOCTOR|PATIENT/).required('user type field is required'),
  email: Yup.string().email('invalid email address').required('email field is required'),
  password: Yup.string().min(6).required('password field is required'),
  first_name: Yup.string().required('first name field is required'),
  last_name: Yup.string().required('last name field is required'),
  birth_date: Yup.date().transform(v => new Date(v)).max(today, 'birth date has to be in the past')
    .typeError("invalid date").required('birth date field is required'),
});

interface Values {
  user_type: string,
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  birth_date: string | null,
}

const initialValues: Values = {
  user_type: 'PATIENT',
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  birth_date: null,
};


const Register: FC = () => {
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  const bgColor = useColorModeValue("white", "gray.700");

  const router = useRouter();

  const dispatch = useAppDispatch();
  const registerSuccess = useAppSelector(state => state.auth.register_success);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();

  if (typeof window !== "undefined" && registerSuccess) {
    // this dispatch might not be necessary since its fired in Login on mount anyway
    router.push('/login').then(() => dispatch(resetRegisterSuccess()));
  }

  const onSubmit = (values: Values) => {
    setIsLoading(true);
    dispatch(
      registerUser({
        first_name: values.first_name,
        last_name: values.last_name,
        type: values.user_type,
        birth_date: values.birth_date,
        email: values.email,
        password: values.password,
      })
    ).unwrap().then((user) => {
      if (user.type === "PATIENT") {
        if (!toast.isActive("success-toast-register")) {
          toast({
            id: "success-toast-register",
            description: "Registration successful! You can now log in.",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
        }
      } else {
        const ok_msg = "Successfully created new staff member account!";
        const info_msg = "Your account has to be activated by admins first!";

        if (!toast.isActive("success-toast-register")) {
          toast({
            id: "success-toast-register",
            description: ok_msg,
            status: "success",
            duration: 6000,
            isClosable: true,
          });
        }

        if (!toast.isActive("info-toast-register-doctor")) {
          toast({
            id: "info-toast-register-doctor",
            description: info_msg,
            status: "info",
            duration: 8000,
            isClosable: true,
          });
        }
      }
    }).catch((err) => {
      // to do better error handling
      if (!toast.isActive("error-toast")) {
        toast({
          id: "error-toast",
          description: "Registration failed!",
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      }
    }).finally(() => setIsLoading(false));
  };

  return (
    <Flex
      direction="column"
      alignSelf="center"
      justifySelf="center"
      overflow="hidden"
      mx={{sm: "24px", lg: "auto"}}
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
          p={{base: "24px", md: "40px"}}
          mx={{base: "auto", md: "100px"}}
          bg={bgColor}
          boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
          textAlign="center"
        >
          <Heading color={titleColor} fontSize="32px" mb="24px">
            Join Us
          </Heading>

          <Formik
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
              <form onSubmit={handleSubmit} autoComplete="off" id="register-form">
                <RadioGroupControl
                  id="radio-group-user-type"
                  name="user_type"
                  stackProps={{justify: "center"}}
                >
                  <Radio
                    id="radio-btn-patient"
                    size="md"
                    value="PATIENT"
                    colorScheme="green"
                  >
                    Patient
                  </Radio>

                  <Radio
                    id="radio-btn-doctor"
                    size="md"
                    value="DOCTOR"
                    colorScheme="blue"
                  >
                    Doctor
                  </Radio>
                </RadioGroupControl>

                <FormControl textAlign="left">
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal" mt="24px">
                    Email*
                  </FormLabel>
                  <Input
                    id="input-email"
                    fontSize="sm"
                    ms="4px"
                    borderRadius="15px"
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    size="lg"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={Boolean(touched.email && errors.email)}
                    isRequired
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
                    fontSize="sm"
                    ms="4px"
                    borderRadius="15px"
                    name="password"
                    type="password"
                    placeholder="Your password"
                    size="lg"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={Boolean(touched.password && errors.password)}
                    isRequired
                  />
                  {touched.password && errors.password && (
                    <FormHelperText>
                      {errors.password}
                    </FormHelperText>
                  )}

                  <Divider ms="4px" my="12px"/>

                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                    First Name*
                  </FormLabel>
                  <Input
                    id="input-first-name"
                    fontSize="sm"
                    ms="4px"
                    borderRadius="15px"
                    name="first_name"
                    type="text"
                    placeholder="Your first name"
                    size="lg"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={Boolean(touched.first_name && errors.first_name)}
                    isRequired
                  />
                  {touched.first_name && errors.first_name && (
                    <FormHelperText>
                      {errors.first_name}
                    </FormHelperText>
                  )}

                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal" mt="24px">
                    Last Name*
                  </FormLabel>
                  <Input
                    id="input-last-name"
                    fontSize="sm"
                    ms="4px"
                    borderRadius="15px"
                    name="last_name"
                    type="text"
                    placeholder="Your last name"
                    size="lg"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={Boolean(touched.last_name && errors.last_name)}
                    isRequired
                  />
                  {touched.last_name && errors.last_name && (
                    <FormHelperText>
                      {errors.last_name}
                    </FormHelperText>
                  )}

                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal" mt="24px">
                    Birth Date*
                  </FormLabel>
                  <Input
                    id="input-birth-date"
                    name="birth_date"
                    type="date"
                    max={today.toISOString().split("T")[0]}
                    isRequired
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={Boolean(touched.birth_date && errors.birth_date)}
                  />
                  {touched.birth_date && errors.birth_date && (
                    <FormHelperText>
                      {errors.birth_date}
                    </FormHelperText>
                  )}

                  <Button
                    id="btn-submit-register"
                    type="submit"
                    bg="teal.400"
                    fontSize="12px"
                    fontWeight="bold"
                    color="white"
                    w="100%"
                    h="45"
                    mt="24px"
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
                    isLoading={isLoading}
                    isDisabled={
                      !(values.first_name && values.last_name && values.email && values.password && values.birth_date)
                    }
                  >
                    SIGN UP
                  </Button>
                </FormControl>
              </form>
            )}
          </Formik>

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
