import React, {FC, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/reducers";
import {loginUser, resetRegisterSuccess} from "../redux/actions/auth";
import {Input} from "@chakra-ui/input";
import {Box, Button, FormControl, FormLabel, Heading} from "@chakra-ui/react";


const Login: FC = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const loading = useSelector((state: RootState) => state.auth.loading);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleInputChange = (e: React.BaseSyntheticEvent) => {
    switch (e.target.name) {
      case 'username':
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

    if (dispatch != null) {
      dispatch(loginUser(username, password));
    }
  };

  useEffect(() => {
    // reset register_success on mount
    if (dispatch != null) dispatch(resetRegisterSuccess());
  }, [dispatch]);

  if (typeof window !== 'undefined' && isAuthenticated) {
    router.push('/dashboard').then();
  }

  return (
    <Box>
      <Heading as="h1">Login Page</Heading>

      <Box>
        <form onSubmit={handleSubmit}>
          <FormLabel>Username*</FormLabel>
          <Input
            onChange={handleInputChange}
            type="text"
            name="username"
            required
          />

          <FormLabel>Password*</FormLabel>
          <Input
            onChange={handleInputChange}
            type="password"
            name="password"
            required
          />

          <Button
            type="submit"
            colorScheme="teal"
            size="md"
            isLoading={loading}
            loadingText="Submitting"
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
