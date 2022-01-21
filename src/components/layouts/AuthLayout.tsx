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
 * @file: Exports AuthLayout HOC which is used to wrap login and register page content.
 * Provides html head with meta tags. Consists of navbar, footer and passed children.
 **/
import {FC, ReactNode, useEffect, useRef} from "react";
import Footer from "../footer/Footer";
import {Box, Portal, useColorModeValue} from "@chakra-ui/react";
import AuthNavbar from "../navbar/AuthNavbar";
import Head from "next/head";

interface AuthLayoutProps {
  children: ReactNode,
  title: string,
  description?: string,
  secondary: boolean,
}

const AuthLayout: FC<AuthLayoutProps> = (
  {children, title, description, secondary}
) => {
  const bgColor = useColorModeValue("teal.400", "");

  const wrapper = useRef(null);
  const navRef = useRef(null);

  return (
    <>
      <Head>
        <meta name="description" content={description}/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <Box ref={navRef} w="100%" minH="100vh" bg={bgColor}>
        <Portal
          containerRef={navRef}
        >
          <AuthNavbar
            secondary={secondary}
            logoText="BOWELL"
          />
        </Portal>

        <Box w="100%">
          <Box
            ref={wrapper}
            w="100%"
          >
            {children}
          </Box>
        </Box>

        <Box px="24px" mx="auto" width="1044px" maxW="100%">
          <Footer textColor="white" linkColor="teal.200"/>
        </Box>
      </Box>
    </>
  );
};

export default AuthLayout;
