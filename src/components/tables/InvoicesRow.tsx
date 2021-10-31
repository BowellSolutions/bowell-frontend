import {
  Box,
  Button,
  Flex,
  Icon,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, {FC} from "react";

interface InvoicesRowProps {
  date: string,
  code: string,
  price: string,
  format: string,
  logo?: string,
}

const InvoicesRow: FC<InvoicesRowProps> = (
  {date, code, price, format, logo}
) => {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Flex my={{sm: "1rem", xl: "10px"}} alignItems="center">
      <Flex direction="column">
        <Text fontSize="md" color={textColor} fontWeight="bold">
          {date}
        </Text>

        <Text fontSize="sm" color="gray.400" fontWeight="semibold" me="16px">
          {code}
        </Text>
      </Flex>

      <Spacer/>

      <Box me="12px">
        <Text fontSize="md" color="gray.400" fontWeight="semibold">
          {price}
        </Text>
      </Box>

      <Button p="0px" bg="transparent" variant="no-hover">
        <Flex alignItems="center" p="12px">
          <Icon w="20px" h="auto" me="5px"/>

          <Text fontSize="md" color={textColor} fontWeight="bold">
            {format}
          </Text>
        </Flex>
      </Button>
    </Flex>
  );
};

export default InvoicesRow;
