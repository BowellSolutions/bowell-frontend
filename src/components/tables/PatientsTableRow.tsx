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
 * @file: Exports PatientsTableRow component used to represent individual row in patients table
 **/
import {Avatar, Badge, Button, Flex, Link, Td, Text, Tr, useColorModeValue,} from "@chakra-ui/react";
import {FC} from "react";
import {formatDate} from "../views/utils/format";
import NextLink from "next/link";
import PatientDetailsModal from "../dashboard/PatientDetailsModal";

interface PatientsTableRowProps {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  isActive: boolean,
  dateJoined: string | Date,
}

const PatientsTableRow: FC<PatientsTableRowProps> = (
  {id, firstName, lastName, email, isActive, dateJoined}
) => {
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  return (
    <Tr>
      <Td minWidth={{sm: "50px"}} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Flex direction="column">
            <NextLink href={`/dashboard/patients/${id}`} passHref>
              <Link>
                <Text
                  fontSize="md"
                  fontWeight="bold"
                  color={textColor}
                  minWidth="100%"
                  cursor="pointer"
                  _hover={{textDecoration: "underline"}}
                >
                  {id}
                </Text>
              </Link>
            </NextLink>
          </Flex>
        </Flex>
      </Td>

      <Td minWidth={{sm: "250px"}} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <NextLink href={`/dashboard/patients/${id}`} passHref>
            <Link>
              <Avatar src="" w="50px" borderRadius="12px" mr="18px" cursor="pointer"/>
            </Link>
          </NextLink>
          <Flex direction="column">
            <NextLink href={`/dashboard/patients/${id}`} passHref>
              <Link>
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  minWidth="100%"
                  textTransform="none"
                  cursor="pointer"
                  _hover={{textDecoration: "underline"}}
                >
                  {firstName} {lastName}
                </Text>
              </Link>
            </NextLink>
            <Text fontSize="sm" color="gray.400" fontWeight="normal" textTransform="none">
              {email}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td>
        <Badge
          bg={isActive ? "green.400" : bgStatus}
          color={isActive ? "white" : colorStatus}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {isActive ? "Active" : "Inactive"}
        </Badge>
      </Td>

      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {formatDate(dateJoined)}
        </Text>
      </Td>

      <Td>
        <NextLink href={`/dashboard/patients/${id}`} passHref>
          <Link>
            <Button p="0px" bg="transparent" variant="no-hover">
              <Text
                fontSize="md"
                color="gray.400"
                fontWeight="bold"
                cursor="pointer"
              >
                Show
              </Text>
            </Button>
          </Link>
        </NextLink>
      </Td>

      <Td>
        <PatientDetailsModal patientId={id}/>
      </Td>
    </Tr>
  );
};

export default PatientsTableRow;
