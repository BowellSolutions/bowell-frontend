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
 * @file: Exports Footer component
 **/
import {Flex, Link, Text} from "@chakra-ui/react";
import {FC} from "react";

interface FooterProps {
  textColor?: string,
  linkColor?: string,
}

const Footer: FC<FooterProps> = ({textColor = 'gray.400', linkColor = 'teal.400'}) => {
  return (
    <Flex
      flexDirection={{base: "column", xl: "row",}}
      alignItems={{base: "center", xl: "start",}}
      justifyContent={"center"}
      px="30px"
      pb="20px"
    >
      <Text
        color={textColor}
        textAlign={{base: "center", xl: "start",}}
        mb={{base: "20px", xl: "0px"}}
      >
        <Text as="span">{"Made by "}</Text>

        <Link
          color={linkColor}
          fontWeight="600"
          href="https://github.com/BowellSolutions"
          target="_blank"
        >
          {"Bowell Solutions "}
        </Link>

        <Text as="span">&copy; 2021 </Text>
      </Text>
    </Flex>
  );
};

export default Footer;
