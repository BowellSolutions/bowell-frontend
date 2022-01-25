/**
 * @license MIT
 * Copyright (c) 2022 Adam Lisichin, Hubert Decyusz, Wojciech Nowicki, Gustaw Daczkowski
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
 * @file: Exports ProfileInfo component which is used in doctor's Profile
 */
import {FC} from "react";
import {BoxProps, Flex, Text, useColorModeValue} from "@chakra-ui/react";
import CardHeader from "../card/CardHeader";
import CardBody from "../card/CardBody";
import {formatDate} from "../views/utils/format";
import Card from "../card/Card";
import {useAppSelector} from "../../redux/hooks";

/**
 * Component which displays user data from Redux store in rows.
 */
const ProfileInfo: FC<BoxProps> = ({...cardProps}) => {
  const textColor = useColorModeValue("gray.700", "white");
  const user = useAppSelector(state => state.auth.user);

  return (
    <Card p="16px" my={{sm: "24px", xl: "0px"}} {...cardProps}>
      <CardHeader p="12px 5px" mb="12px">
        <Text fontSize="lg" color={textColor} fontWeight="bold">
          Profile Information
        </Text>
      </CardHeader>

      <CardBody px="5px">
        <Flex direction="column">
          <Flex align="center" mb="18px">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              me="10px"
            >
              First Name:{" "}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400" textTransform="none">
              {user?.first_name}
            </Text>
          </Flex>

          <Flex align="center" mb="18px">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              me="10px"
            >
              Last Name:{" "}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400" textTransform="none">
              {user?.last_name}
            </Text>
          </Flex>

          <Flex align="center" mb="18px">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              me="10px"
            >
              Email:{" "}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400" textTransform="none">
              {user?.email}
            </Text>
          </Flex>

          <Flex align="center" mb="18px">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              me="10px"
            >
              Birth Date:{" "}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400" textTransform="none">
              {user?.birth_date}
            </Text>
          </Flex>

          <Flex align="center" mb="18px">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              me="10px"
            >
              Join Date:{" "}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400" textTransform="none">
              {user != null && formatDate(user.date_joined)}
            </Text>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ProfileInfo;
