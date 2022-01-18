/**
 * @author: Adam Lisichin
 * @file: Exports AuthNavbarLinks component - links rendered in AuthNavbar
 **/
import NextLink from "next/link";
import {Button, HStack, Icon, Link, Text} from "@chakra-ui/react";
import {IoIosHome, IoIosRocket} from "react-icons/io";
import {MdLogin, MdOutlineDashboard} from "react-icons/md";
import {FC} from "react";

interface AuthNavbarLinksProps {
  color: string,
}

const AuthNavbarLinks: FC<AuthNavbarLinksProps> = ({color}) => {
  return (
    <HStack display={{sm: "none", lg: "flex"}}>
      <NextLink href="/" passHref>
        <Link>
          <Button
            fontSize="sm"
            px="0px"
            mx="1px"
            color={color}
            variant="transparent-with-icon"
            leftIcon={
              <Icon
                as={IoIosHome}
                color={color}
                w="14px"
                h="14px"
                me="0px"
              />
            }
          >
            <Text>Home</Text>
          </Button>
        </Link>
      </NextLink>

      <NextLink href="/dashboard" passHref>
        <Link>
          <Button
            fontSize="sm"
            px="0px"
            mx="1px"
            color={color}
            variant="transparent-with-icon"
            leftIcon={
              <Icon
                as={MdOutlineDashboard}
                color={color}
                w="14px"
                h="14px"
                me="0px"
              />
            }
          >
            <Text>Dashboard</Text>
          </Button>
        </Link>
      </NextLink>

      <NextLink href="/login" passHref>
        <Link>
          <Button
            fontSize="sm"
            px="0px"
            mx="1px"
            color={color}
            variant="transparent-with-icon"
            leftIcon={
              <Icon
                as={MdLogin}
                color={color}
                w="14px"
                h="14px"
                me="0px"
              />
            }
          >
            <Text>Login</Text>
          </Button>
        </Link>
      </NextLink>

      <NextLink href="/register" passHref>
        <Link>
          <Button
            fontSize="sm"
            px="0px"
            mx="1px"
            color={color}
            variant="transparent-with-icon"
            leftIcon={
              <Icon
                as={IoIosRocket}
                color={color}
                w="12px"
                h="12px"
                me="0px"
              />
            }
          >
            <Text>Register</Text>
          </Button>
        </Link>
      </NextLink>
    </HStack>
  );
};

export default AuthNavbarLinks;
