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
 * @file: Exports ButtonLink component used in sidebars
 **/
import {Button, Link, Flex, Text, useColorModeValue} from "@chakra-ui/react";
import IconBox from "../icons/IconBox";
import NextLink from "next/link";
import {FC} from "react";

export interface ButtonLinkProps {
  icon: JSX.Element,
  name: string,
  href: string,
  key: string,
}

const ButtonLink: FC<ButtonLinkProps> = ({icon, name, href, key}) => {
  const inactiveBg = useColorModeValue("white", "gray.700");
  const inactiveColor = useColorModeValue("gray.400", "gray.400");

  return (
    <NextLink href={href} passHref key={key + "-link"}>
      <Link>
        <Button
          boxSize="initial"
          justifyContent="flex-start"
          alignItems="center"
          bg="transparent"
          mb={{xl: "12px",}}
          mx={{xl: "auto",}}
          py="12px"
          ps={{sm: "10px", xl: "16px",}}
          borderRadius="15px"
          sx={{
            "&:hover": "none",
          }}
          w="100%"
          _active={{
            bg: "inherit",
            transform: "none",
            borderColor: "transparent",
          }}
          _focus={{
            boxShadow: "none",
          }}
        >
          <Flex>
            <IconBox
              // @ts-ignore
              bg={inactiveBg}
              color="teal.300"
              h="30px"
              w="30px"
              me="12px"
            >
              {icon}
            </IconBox>
            <Text color={inactiveColor} my="auto" fontSize="sm">
              {name}
            </Text>
          </Flex>
        </Button>
      </Link>
    </NextLink>
  );
};

export default ButtonLink;
