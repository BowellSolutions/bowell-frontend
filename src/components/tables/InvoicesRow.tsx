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
    </Flex>
  );
};

export default InvoicesRow;
