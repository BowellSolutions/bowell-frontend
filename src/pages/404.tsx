/**
 * @author: Adam Lisichin
 * @file: 404 page rendered by Next.js
 **/
import {NextPage} from "next";
import {Flex} from "@chakra-ui/react";
import PageNotFound from "../components/views/404";
import Head from "next/head";


const NotFound: NextPage = () => {
  return (
    <>
      <Head>
        <title>Oops. Page not found!</title>
      </Head>

      <Flex justifyContent="center" alignItems="center" minH="100vh">
        <PageNotFound/>
      </Flex>
    </>

  );
};


export default NotFound;
