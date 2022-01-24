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
 * @file: Handles /login route
 **/
import {NextPage} from "next";
import Login from "../components/views/Login";
import AuthLayout from "../components/layouts/AuthLayout";
import {useRouter} from "next/router";
import {useAppSelector} from "../redux/hooks";
import {wrapper} from "../redux/store";
import {checkAuth} from "../redux/actions/auth";

const LoginPage: NextPage = () => {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (typeof window !== 'undefined' && isAuthenticated) {
    router.push('/dashboard').then();
  }

  return (
    <AuthLayout
      title="Login"
      description="Bowell's login page"
      secondary={false}
    >
      <Login/>
    </AuthLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async (context) => {
      await store.dispatch<any>(checkAuth(context.req.cookies.access));

      return {
        props: {}
      };
    }
);

export default LoginPage;
