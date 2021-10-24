import {NextPage} from "next";
import Login from "../components/Login";
import Layout from "../components/layout/Layout";

const LoginPage: NextPage = () => {
  return (
    <Layout
      title="Login"
      content="Bowell's login page"
    >
      <Login/>
    </Layout>
  );
};

export default LoginPage;
