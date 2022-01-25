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
 * @file: Exports ButtonActiveLink component used in sidebars
 **/
import {Button, Link, Flex, Text, useColorModeValue} from "@chakra-ui/react";
import IconBox from "../icons/IconBox";
import NextLink from "next/link";
import {ButtonLinkProps} from "./ButtonLink";
import {FC} from "react";


const ButtonActiveLink: FC<ButtonLinkProps> = ({icon, name, href, key}) => {
  const activeBg = useColorModeValue("white", "gray.700");
  const activeColor = useColorModeValue("gray.700", "white");

  return (
    <NextLink href={href} passHref key={key + "-link"}>
      <Link>
        <Button
          boxSize="initial"
          justifyContent="flex-start"
          alignItems="center"
          bg={activeBg}
          mb={{xl: "12px",}}
          mx={{xl: "auto",}}
          ps={{sm: "10px", xl: "16px",}}
          py="12px"
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
          key={key + "-btn"}
        >
          <Flex key={key + "-flex"}>
            <IconBox
              // @ts-ignore
              bg="teal.300"
              color="white"
              h="30px"
              w="30px"
              me="12px"
              key={key + "-icon"}
            >
              {icon}
            </IconBox>

            <Text color={activeColor} my="auto" fontSize="sm" key={key + "-text"}>
              {name}
            </Text>
          </Flex>
        </Button>
      </Link>
    </NextLink>
  );
};

export default ButtonActiveLink;
