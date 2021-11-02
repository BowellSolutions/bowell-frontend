import {Button, Flex, Icon, Link, useColorModeValue} from "@chakra-ui/react";
import NextLink from "next/link";
import {FC, useRef} from "react";
import {BsFillPersonFill} from "react-icons/bs";
import {IoMdSettings} from "react-icons/io";
import SidebarResponsive from "../sidebar/SidebarResponsive";
import Notifications from "../menu/Notifications";
import {useDispatch} from "react-redux";
import {logoutUser} from "../../redux/actions/auth";

interface DashboardNavbarLinksProps {
  logoText: string,
  variant?: string,
  fixed: boolean,
  secondary: boolean,
  onOpen: () => void,
}

const DashboardNavbarLinks: FC<DashboardNavbarLinksProps> = (
  {
    logoText,
    variant,
    children,
    fixed,
    secondary,
    onOpen,
    ...rest
  }) => {

  const dispatch = useDispatch();

  const grayLinkColor = useColorModeValue("gray.500", "gray.200");
  const navbarLinkColor = secondary ? "white" : grayLinkColor;

  const handleLogout = () => dispatch(logoutUser());

  const settingsRef = useRef(null);

  return (
    <Flex
      pe={{sm: "0px", md: "16px"}}
      w={{sm: "100%", md: "auto"}}
      alignItems="center"
      flexDirection="row"
    >
      <Flex flexGrow={1}/>

      <Button
        ms="0px"
        px="0px"
        p={"8px"}
        mr={{sm: "16px", md: "16px"}}
        color={navbarLinkColor}
        variant="outline"
        onClick={handleLogout}
      >
        Logout
      </Button>

      <NextLink href="/dashboard/profile" passHref>
        <Icon
          as={BsFillPersonFill}
          w="22px"
          h="22px"
          mx="0px"
          px="0px"
          me={{sm: "16px", lg: "8px"}}
          color={navbarLinkColor}
          cursor="pointer"
        />
      </NextLink>

      <SidebarResponsive
        logoText={logoText}
        secondary={secondary}
        {...rest}
      />

      <Icon
        as={IoMdSettings}
        w="22px"
        h="22px"
        me={{sm: "16px", lg: "4px"}}
        ref={settingsRef}
        onClick={onOpen}
        color={navbarLinkColor}
        cursor="pointer"
      />

      <Notifications color={navbarLinkColor}/>
    </Flex>
  );
};

export default DashboardNavbarLinks;
