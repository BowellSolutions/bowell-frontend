import {NextPage} from "next";
import Layout from "../components/layout/Layout";
import {Heading} from "@chakra-ui/react";

const RegisterPage: NextPage = () => {
  return (
    <Layout
      title="Register"
      content="Bowell's login page"
    >
      <Heading as="h1">Register page</Heading>
    </Layout>
  );
};

export default RegisterPage;
