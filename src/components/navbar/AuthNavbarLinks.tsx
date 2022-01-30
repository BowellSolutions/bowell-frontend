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
 * @file: Exports AuthNavbarLinks component - links rendered in AuthNavbar
 **/
import NextLink from "next/link";
import {Button, HStack, Icon, Link, Text} from "@chakra-ui/react";
import {IoIosHome, IoIosRocket} from "react-icons/io";
import {MdLogin, MdOutlineDashboard} from "react-icons/md";
import {FC} from "react";

interface AuthNavbarLinksProps {
  color: string,
}

const AuthNavbarLinks: FC<AuthNavbarLinksProps> = ({color}) => {
  return (
    <HStack display={{sm: "none", lg: "flex"}}>
      <NextLink href="/" passHref>
        <Link>
          <Button
            fontSize="sm"
            px="0px"
            mx="1px"
            color={color}
            variant="transparent-with-icon"
            leftIcon={
              <Icon
                as={IoIosHome}
                color={color}
                w="14px"
                h="14px"
                me="0px"
              />
            }
          >
            <Text>Home</Text>
          </Button>
        </Link>
      </NextLink>

      <NextLink href="/dashboard" passHref>
        <Link>
          <Button
            fontSize="sm"
            px="0px"
            mx="1px"
            color={color}
            variant="transparent-with-icon"
            leftIcon={
              <Icon
                as={MdOutlineDashboard}
                color={color}
                w="14px"
                h="14px"
                me="0px"
              />
            }
          >
            <Text>Dashboard</Text>
          </Button>
        </Link>
      </NextLink>

      <NextLink href="/login" passHref>
        <Link>
          <Button
            fontSize="sm"
            px="0px"
            mx="1px"
            color={color}
            variant="transparent-with-icon"
            leftIcon={
              <Icon
                as={MdLogin}
                color={color}
                w="14px"
                h="14px"
                me="0px"
              />
            }
          >
            <Text>Login</Text>
          </Button>
        </Link>
      </NextLink>

      <NextLink href="/register" passHref>
        <Link>
          <Button
            fontSize="sm"
            px="0px"
            mx="1px"
            color={color}
            variant="transparent-with-icon"
            leftIcon={
              <Icon
                as={IoIosRocket}
                color={color}
                w="12px"
                h="12px"
                me="0px"
              />
            }
          >
            <Text>Register</Text>
          </Button>
        </Link>
      </NextLink>
    </HStack>
  );
};

export default AuthNavbarLinks;
