import {FC, useRef} from "react";
import {Separator} from "../utils/Separator";
import {Box, Icon, Link, Stack, Text, useColorModeValue} from "@chakra-ui/react";
import {useRouter} from "next/router";
import NextLink from "next/link";
import type {UserType} from "../layouts/DashboardLayout";
import SidebarLinks from "./SidebarLinks";

interface SidebarProps {
  logoText: string,
  display: string,
  sidebarVariant: string,
  user: UserType
}

const Sidebar: FC<SidebarProps> = ({logoText, display, sidebarVariant, user}) => {
  const mainPanel = useRef(null);

  const variantChange = "0.2s linear";
  const sidebarBgOpaque = useColorModeValue("white", "gray.700");

  let sidebarBg = "none";
  let sidebarRadius = "0px";
  let sidebarMargins = "0px";
  if (sidebarVariant === "opaque") {
    sidebarBg = sidebarBgOpaque;
    sidebarRadius = "16px";
    sidebarMargins = "16px 0px 16px 16px";
  }

  return (
    <Box ref={mainPanel}>
      <Box display={{sm: "none", xl: "block"}} position="fixed">
        <Box
          bg={sidebarBg}
          transition={variantChange}
          w="260px"
          maxW="260px"
          ms={{
            sm: "16px",
          }}
          my={{
            sm: "16px",
          }}
          h="calc(100vh - 32px)"
          ps="20px"
          pe="20px"
          m={sidebarMargins}
          borderRadius={sidebarRadius}
        >
          <Box>
            <Box pt={"25px"} mb="12px">
              <NextLink href="/" passHref key="link-to-home">
                <Link
                  display="flex"
                  lineHeight="100%"
                  mb="30px"
                  fontWeight="bold"
                  justifyContent="center"
                  alignItems="center"
                  fontSize="11px"
                >
                  <Icon w="32px" h="32px" me="10px"/>
                  <Text fontSize="sm" mt="3px">
                    {logoText}
                  </Text>
                </Link>
              </NextLink>
              <Separator/>
            </Box>
          </Box>
          <Stack direction="column" mb="40px">
            <Box>
              <SidebarLinks
                sidebarVariant={sidebarVariant}
                user={user}
              />
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
