import {FC, useRef} from "react";
import {Separator} from "../utils/Separator";
import {Box, Button, Flex, Icon, Link, Stack, useColorModeValue, Text} from "@chakra-ui/react";
import {useRouter} from "next/router";
import NextLink from "next/link";
import routes from "../routes";
import IconBox from "../icons/IconBox";

interface SidebarProps {
  logoText: string,
  display: string,
  sidebarVariant: string,
}

const Sidebar: FC<SidebarProps> = ({logoText, display, sidebarVariant}) => {
  const router = useRouter();
  const mainPanel = useRef();

  const variantChange = "0.2s linear";

  const actBg = useColorModeValue("white", "gray.700");
  const actBgOpaque = "transparent";
  const inactBg = useColorModeValue("white", "gray.700");
  const inactBgOpaque = useColorModeValue("gray.100", "gray.600");
  const actColor = useColorModeValue("gray.700", "white");
  const actColorOpaque = useColorModeValue("gray.700", "white");
  const inactColor = useColorModeValue("gray.400", "gray.400");
  const inactColorOpaque = useColorModeValue("gray.400", "gray.400");
  const sidebarActShadow = "0px 7px 11px rgba(0, 0, 0, 0.04)";
  const sidebarActShadowOpaque = "none";
  const sidebarBgOpaque = useColorModeValue("white", "gray.700");


  let sidebarBg = "none";
  let sidebarRadius = "0px";
  let sidebarMargins = "0px";
  if (sidebarVariant === "opaque") {
    sidebarBg = sidebarBgOpaque;
    sidebarRadius = "16px";
    sidebarMargins = "16px 0px 16px 16px";
  }

  const createLinks = (routes: any) => {
    let activeBg = actBg;
    let inactiveBg = inactBg;
    let activeColor = actColor;
    let inactiveColor = inactColor;
    let sidebarActiveShadow = sidebarActShadow;

    if (sidebarVariant === "opaque") {
      activeBg = actBgOpaque;
      inactiveBg = inactBgOpaque;
      activeColor = actColorOpaque;
      inactiveColor = inactColorOpaque;
      sidebarActiveShadow = sidebarActShadowOpaque;
    }

    return routes.map((prop: any) => {
      return (
        <NextLink href={prop.layout + prop.path} passHref key={prop.layout + prop.path}>
          {router.pathname === prop.layout + prop.path ? (
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              boxShadow={sidebarActiveShadow}
              bg={activeBg}
              transition={variantChange}
              mb={{
                xl: "12px",
              }}
              mx={{
                xl: "auto",
              }}
              ps={{
                sm: "10px",
                xl: "16px",
              }}
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
                  // @ts-ignore
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
              mb={{
                xl: "12px",
              }}
              mx={{
                xl: "auto",
              }}
              py="12px"
              ps={{
                sm: "10px",
                xl: "16px",
              }}
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
                  // @ts-ignore
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
      );
    });
  };

  return (
    // @ts-ignore
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
              {createLinks(routes)}
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
