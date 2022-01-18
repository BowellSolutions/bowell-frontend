/**
 * @author: Adam Lisichin
 * @file: Exports ButtonActiveLink component used in sidebars
 **/
import {Button, Link, Flex, Text, useColorModeValue} from "@chakra-ui/react";
import IconBox from "../icons/IconBox";
import NextLink from "next/link";
import {ButtonLinkProps} from "./ButtonLink";
import {FC} from "react";


const ButtonActiveLink: FC<ButtonLinkProps> = ({icon, name, href, key}) => {
  const activeBg = useColorModeValue("white", "gray.700");
  const activeColor = useColorModeValue("gray.700", "white");

  return (
    <NextLink href={href} passHref key={key + "-link"}>
      <Link>
        <Button
          boxSize="initial"
          justifyContent="flex-start"
          alignItems="center"
          bg={activeBg}
          mb={{xl: "12px",}}
          mx={{xl: "auto",}}
          ps={{sm: "10px", xl: "16px",}}
          py="12px"
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
          key={key + "-btn"}
        >
          <Flex key={key + "-flex"}>
            <IconBox
              // @ts-ignore
              bg="teal.300"
              color="white"
              h="30px"
              w="30px"
              me="12px"
              key={key + "-icon"}
            >
              {icon}
            </IconBox>

            <Text color={activeColor} my="auto" fontSize="sm" key={key + "-text"}>
              {name}
            </Text>
          </Flex>
        </Button>
      </Link>
    </NextLink>
  );
};

export default ButtonActiveLink;
