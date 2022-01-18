/**
 * @author: Adam Lisichin
 * @file: Exports SidebarButton component
 **/
import {Button, Flex, Text, useColorModeValue} from "@chakra-ui/react";
import IconBox from "../icons/IconBox";
import {FC} from "react";

interface SidebarButtonProps {
  icon: JSX.Element,
  name: string,
  onClick?: () => void
}

const SidebarButton: FC<SidebarButtonProps> = ({icon, name, onClick}) => {
  const inactiveBg = useColorModeValue("white", "gray.700");
  const inactiveColor = useColorModeValue("gray.400", "gray.400");

  return (
    <Button
      boxSize="initial"
      justifyContent="flex-start"
      alignItems="center"
      bg="transparent"
      mb={{xl: "12px",}}
      mx={{xl: "auto"}}
      py="12px"
      ps={{sm: "10px", xl: "16px",}}
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
      onClick={onClick}
    >
      <Flex>
        <IconBox
          bg={inactiveBg}
          color="teal.300"
          h="30px"
          w="30px"
          me="12px"
        >
          {icon}
        </IconBox>
        <Text color={inactiveColor} my="auto" fontSize="sm">
          {name}
        </Text>
      </Flex>
    </Button>
  );
};

export default SidebarButton;
