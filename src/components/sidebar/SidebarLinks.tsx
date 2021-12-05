import {FC} from "react";
import {UserType} from "../layouts/DashboardLayout";
import {Box, Button, Flex, Text, useColorModeValue} from "@chakra-ui/react";
import NextLink from "next/link";
import IconBox from "../icons/IconBox";
import {useRouter} from "next/router";
import {doctorsRoutes, patientsRoutes} from "../routes";

interface SidebarLinksProps {
  sidebarVariant: string,
  user: UserType,
}

const SidebarLinks: FC<SidebarLinksProps> = ({sidebarVariant, user}) => {
  const router = useRouter();
  const variantChange = "0.2s linear";
  const actBgOpaque = "transparent";
  const actBg = useColorModeValue("white", "gray.700");
  const inactBg = useColorModeValue("white", "gray.700");
  const inactBgOpaque = useColorModeValue("gray.100", "gray.600");

  const activeColor = useColorModeValue("gray.700", "white");
  const inactiveColor = useColorModeValue("gray.400", "gray.400");

  const sidebarActShadow = "0px 7px 11px rgba(0, 0, 0, 0.04)";
  const sidebarActShadowOpaque = "none";

  let activeBg = actBg;
  let inactiveBg = inactBg;
  let sidebarActiveShadow = sidebarActShadow;

  if (sidebarVariant === "opaque") {
    activeBg = actBgOpaque;
    inactiveBg = inactBgOpaque;
    sidebarActiveShadow = sidebarActShadowOpaque;
  }

  const routesToMap = user === "doctor" ? doctorsRoutes : patientsRoutes;

  return (
    <Box>
      {routesToMap && routesToMap.map((prop) => (
        <NextLink href={prop.layout + prop.path} passHref key={prop.layout + prop.path}>
          {router.pathname === prop.layout + prop.path ? (
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              boxShadow={sidebarActiveShadow}
              bg={activeBg}
              transition={variantChange}
              mb={{xl: "12px",}}
              mx={{xl: "auto",}}
              ps={{sm: "10px", xl: "16px",}}
              py="12px"
              borderRadius="15px"
              w="100%"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)",
              }}
            >
              <Flex>
                <IconBox
                  bg="teal.300"
                  color="white"
                  h="30px"
                  w="30px"
                  me="12px"
                  transition={variantChange}
                >
                  {prop.icon}
                </IconBox>

                <Text color={activeColor} my="auto" fontSize="sm">
                  {prop.name}
                </Text>
              </Flex>
            </Button>
          ) : (
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
              // @ts-ignore
              _hover="none"
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
                  bg={inactiveBg}
                  color="teal.300"
                  h="30px"
                  w="30px"
                  me="12px"
                  transition={variantChange}
                >
                  {prop.icon}
                </IconBox>

                <Text color={inactiveColor} my="auto" fontSize="sm">
                  {prop.name}
                </Text>
              </Flex>
            </Button>
          )}
        </NextLink>
      ))
      }
    </Box>
  );
};

export default SidebarLinks;
