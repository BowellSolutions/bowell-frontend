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
 * @file: Exports ItemContent component - list item inside the Notifications menu
 **/
import {Icon} from "@chakra-ui/icon";
import {Avatar, CloseButton, Flex, Text, useColorModeValue} from "@chakra-ui/react";
import {AiFillClockCircle} from "react-icons/ai";
import {FC} from "react";

interface ItemContentProps {
  letter: string,
  boldInfo: string,
  info: string,
  time: string,
  deleteItem: () => void,
}

const ItemContent: FC<ItemContentProps> = (
  {letter, boldInfo, info, time, deleteItem}
) => {
  const navbarIcon = useColorModeValue("gray.500", "gray.200");
  const notificationColor = useColorModeValue("gray.700", "white");

  return (
    <>
      <Avatar name={letter} src="" borderRadius="12px" mr="8px"/>

      <Flex flexDirection="column" mr="8px" flexGrow={1}>
        <Text fontSize="14px" mb="5px" color={notificationColor}>
          <Text fontWeight="bold" fontSize="14px" as="span">
            {boldInfo}{" "}
          </Text>
          {info}
        </Text>
        <Flex alignItems="center">
          <Icon
            as={AiFillClockCircle}
            color={navbarIcon}
            w="13px"
            h="13px"
            me="3px"
          />
          <Text fontSize="xs" lineHeight="100%" color={navbarIcon}>
            {time}
          </Text>
        </Flex>
      </Flex>

      <CloseButton onClick={deleteItem}/>
    </>
  );
};

export default ItemContent;
