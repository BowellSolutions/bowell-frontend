import React, {FC, useState} from "react";
import {useRouter} from "next/router";
import {login} from "../api/auth";


const Login: FC = () => {
  const router = useRouter();

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

    login(username, password).then(() => {
      // dispatch success action handler
      router.push('/').then(() => {
      });
    }).catch(() => {
      // dispatch fail
    });
  };

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

        <button
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
