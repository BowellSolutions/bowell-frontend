import React, {FC, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/reducers";
import {loginUser, resetRegisterSuccess} from "../redux/actions/auth";


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
    <div>
      <h1>Login Page</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username*</label>
        <input
          onChange={handleInputChange}
          type="text"
          name="username"
          required
        />

        <label htmlFor="password">Password*</label>
        <input
          onChange={handleInputChange}
          type="password"
          name="password"
          required
        />

        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <button
            type="submit"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
