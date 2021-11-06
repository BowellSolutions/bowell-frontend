import {Box, Flex, Icon, Text, useColorModeValue} from "@chakra-ui/react";
import React, {FC} from "react";
import {BsFillPeopleFill} from "react-icons/bs";

interface TimelineRowProps {
  logo?: string,
  title: string,
  date: string,
  color: string,
  index: number,
  arrLength: number,
}

const TimelineRow: FC<TimelineRowProps> = (
  {title, date, color, index, arrLength}
) => {
  const textColor = useColorModeValue("gray.700", "white.300");
  const bgIconColor = useColorModeValue("white.300", "gray.700");

  return (
    <Flex alignItems="center" minH="78px" justifyContent="start" mb="5px">
      <Flex direction="column" h="100%">
        <Icon
          bg={bgIconColor}
          as={BsFillPeopleFill}
          color={color}
          h={"30px"}
          w={"26px"}
          pe="6px"
          zIndex="1"
          position="relative"
          right=""
          left="-8px"
        />

        <Box
          w="2px"
          bg="gray.200"
          h={index === arrLength - 1 ? "15px" : "100%"}
        />
      </Flex>

      <Flex direction="column" justifyContent="flex-start" h="100%">
        <Text fontSize="sm" color={textColor} fontWeight="bold">
          {title}
        </Text>
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {date}
        </Text>
      </Flex>
    </Flex>
  );
};

export default TimelineRow;
