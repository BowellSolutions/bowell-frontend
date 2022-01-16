/**
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
