import {Avatar, Badge, Button, Flex, Td, Text, Tr, useColorModeValue,} from "@chakra-ui/react";
import React, {FC} from "react";
import {formatDate} from "../views/utils/format";
import NextLink from "next/link";

interface TablesTableRowProps {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  isActive: boolean,
  dateJoined: string | Date,
}

const PatientsTableRow: FC<TablesTableRowProps> = (
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
            <Text
              fontSize="md"
              fontWeight="bold"
              color={textColor}
              minWidth="100%"
            >
              {id}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td minWidth={{sm: "250px"}} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Avatar src="" w="50px" borderRadius="12px" mr="18px"/>
          <Flex direction="column">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
              textTransform="none"
            >
              {firstName} {lastName}
            </Text>
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
      </Td>

      <Td>
        {/* redirect to profile/id later */}
        <NextLink passHref href="/dashboard">
          <Button p="0px" bg="transparent" variant="no-hover">
            <Text
              fontSize="md"
              color="gray.400"
              fontWeight="bold"
              cursor="pointer"
            >
              View
            </Text>
          </Button>
        </NextLink>
      </Td>
    </Tr>
  );
};

export default PatientsTableRow;
