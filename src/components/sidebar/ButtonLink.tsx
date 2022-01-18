/**
 * @author: Adam Lisichin
 * @file: Exports ButtonLink component used in sidebars
 **/
import {Button, Link, Flex, Text, useColorModeValue} from "@chakra-ui/react";
import IconBox from "../icons/IconBox";
import NextLink from "next/link";
import {FC} from "react";

export interface ButtonLinkProps {
  icon: JSX.Element,
  name: string,
  href: string,
  key: string,
}

const ButtonLink: FC<ButtonLinkProps> = ({icon, name, href, key}) => {
  const inactiveBg = useColorModeValue("white", "gray.700");
  const inactiveColor = useColorModeValue("gray.400", "gray.400");

  return (
    <NextLink href={href} passHref key={key + "-link"}>
      <Link>
        <Button
          boxSize="initial"
          justifyContent="flex-start"
          alignItems="center"
          bg="transparent"
          mb={{xl: "12px",}}
          mx={{xl: "auto",}}
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
        >
          <Flex>
            <IconBox
              // @ts-ignore
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
      </Link>
    </NextLink>
  );
};

export default ButtonLink;
