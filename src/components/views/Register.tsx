import {
  Button, Divider,
  Flex,
  FormControl, FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link, Radio, RadioGroup,
  Select, Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {ChangeEvent, FC, FormEvent, useEffect, useState} from "react";
import NextLink from "next/link";
import {useAppSelector} from "../../redux/hooks";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import {resetRegisterSuccess} from "../../redux/reducers/auth";
import {loginUser, registerUser} from "../../redux/actions/auth";
import {use} from "msw/lib/types/utils/internal/requestHandlerUtils";
import {Separator} from "../utils/Separator";


const Register: FC = () => {
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  const bgColor = useColorModeValue("white", "gray.700");

  const router = useRouter();

  const dispatch = useDispatch();
  const registerSuccess = useAppSelector(state => state.auth.register_success);

  const [userType, setUserType] = useState<string>("PATIENT");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string | null>(null);

  if (typeof window !== "undefined" && registerSuccess) {
    router.push('/login').then(() => dispatch(resetRegisterSuccess()));
    // this dispatch might not be necessary since its fired in Login on mount anyway
  }

  const isFormFilled = firstName && lastName && email && password && birthDate;

  const isDateTimeInvalid = () => {
    return !!(birthDate && new Date().getTime() <= new Date(birthDate as string).getTime());
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'first_name':
        setFirstName(e.target.value);
        break;
      case 'last_name':
        setLastName(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'birth_date':
        setBirthDate(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFormFilled) {
      dispatch(registerUser({
        first_name: firstName,
        last_name: lastName,
        type: userType,
        birth_date: birthDate,
        email,
        password,
      }));
    }
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

          <form onSubmit={handleSubmit}>
            <FormControl>
              <RadioGroup mb="24px" onChange={setUserType} value={userType} isRequired>
                <Stack spacing={5} direction="row" justifyContent="center">
                  <Radio
                    size="md"
                    value="PATIENT"
                    colorScheme="green"
                  >
                    Patient
                  </Radio>

                  <Radio
                    size="md"
                    value="DOCTOR"
                    colorScheme="blue"
                  >
                    Doctor
                  </Radio>
                </Stack>
              </RadioGroup>

              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Email*
              </FormLabel>
              <Input
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                name="email"
                type="email"
                placeholder="Your email address"
                mb="24px"
                size="lg"
                onChange={handleInputChange}
                isRequired
              />

              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Password*
              </FormLabel>
              <Input
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                name="password"
                type="password"
                placeholder="Your password"
                mb="24px"
                size="lg"
                onChange={handleInputChange}
                isRequired
              />

              <Divider ms="4px" mb="24px"/>

              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                First Name*
              </FormLabel>
              <Input
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                name="first_name"
                type="text"
                placeholder="Your first name"
                mb="24px"
                size="lg"
                onChange={handleInputChange}
                isRequired
              />

              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Last Name*
              </FormLabel>
              <Input
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                name="last_name"
                type="text"
                placeholder="Your last name"
                mb="24px"
                size="lg"
                onChange={handleInputChange}
                isRequired
              />

              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Birth Date*
              </FormLabel>
              <Input
                name="birth_date"
                type="date"
                isRequired
                isInvalid={isDateTimeInvalid()}
                onChange={handleInputChange}
                mb="24px"
              />

              {isDateTimeInvalid() && (
                <FormHelperText>
                  Invalid date
                </FormHelperText>
              )}

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
                isDisabled={!isFormFilled}
              >
                SIGN UP
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
