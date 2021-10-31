import NextLink from "next/link";
import {Button, HStack, Icon, Text} from "@chakra-ui/react";
import {IoIosHome, IoIosRocket} from "react-icons/io";
import {BsFillPersonFill} from "react-icons/bs";
import {IoDocumentSharp} from "react-icons/io5";
import {FC} from "react";

interface AuthNavbarLinksProps {
  color: string,
}

const AuthNavbarLinks: FC<AuthNavbarLinksProps> = ({color}) => {
  return (
    <HStack display={{sm: "none", lg: "flex"}}>
      <NextLink href="/dashboard/" passHref>
        <Button
          fontSize="sm"
          px="0px"
          ms="0px"
          me={{sm: "2px", md: "16px"}}
          color={color}
          variant="transparent-with-icon"
          leftIcon={
            <Icon
              as={IoIosHome}
              color={color}
              w="12px"
              h="12px"
              me="0px"
            />
          }
        >
          <Text>Dashboard</Text>
        </Button>
      </NextLink>

      <NextLink href="/dashboard/profile" passHref>
        <Button
          fontSize="sm"
          ms="0"
          px="0"
          me={{sm: "2px", md: "16px"}}
          color={color}
          variant="transparent-with-icon"
          leftIcon={
            <Icon
              as={BsFillPersonFill}
              color={color}
              w="12px"
              h="12px"
              me="0px"
            />
          }
        >
          <Text>Profile</Text>
        </Button>
      </NextLink>

      <NextLink href="/register" passHref>
        <Button
          fontSize="sm"
          ms="0px"
          px="0px"
          me={{sm: "2px", md: "16px"}}
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
      </NextLink>

      <NextLink href="/login" passHref>
        <Button
          fontSize="sm"
          px="0px"
          me={{sm: "2px", md: "16px"}}
          color={color}
          variant="transparent-with-icon"
          leftIcon={
            <Icon
              as={IoDocumentSharp}
              color={color}
              w="12px"
              h="12px"
              me="0px"
            />
          }
        >
          <Text>Login</Text>
        </Button>
      </NextLink>
    </HStack>
  );
};

export default AuthNavbarLinks;
