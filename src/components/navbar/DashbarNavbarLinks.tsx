import {Button, Flex, Icon, Link, useColorModeValue} from "@chakra-ui/react";
import NextLink from "next/link";
import {FC} from "react";
import {BsFillPersonFill} from "react-icons/bs";
import {IoMdSettings} from "react-icons/io";
import SidebarResponsive from "../sidebar/SidebarResponsive";
import Notifications from "../menu/Notifications";
import {logoutUser} from "../../redux/actions/auth";
import {useDispatch} from "react-redux";

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
        mr={{sm: "2px", md: "16px"}}
        color={navbarLinkColor}
        variant="transparent-with-icon"
        leftIcon={
          <Icon
            as={BsFillPersonFill}
            color={navbarLinkColor}
            w="22px"
            h="22px"
            me="0px"
          />
        }
        onClick={handleLogout}
      >
        Logout
      </Button>

      <NextLink href="/dashboard/profile" passHref>
        <Link>
          <Button
            ms="0px"
            px="0px"
            mr={{sm: "2px", md: "16px"}}
            color={navbarLinkColor}
            variant="transparent-with-icon"
            rightIcon={
              <Icon
                as={BsFillPersonFill}
                color={navbarLinkColor}
                w="22px"
                h="22px"
                me="0px"
              />
            }
          />
        </Link>
      </NextLink>

      <SidebarResponsive
        logoText={logoText}
        secondary={secondary}
        {...rest}
      />

      <Icon
        as={IoMdSettings}
        cursor="pointer"
        ms={{base: "16px", xl: "0px"}}
        me="16px"
        // ref={settingsRef}
        onClick={onOpen}
        color={navbarLinkColor}
        w="18px"
        h="18px"
      />

      <Notifications color={navbarLinkColor}/>
    </Flex>
  );
};

export default DashboardNavbarLinks;
