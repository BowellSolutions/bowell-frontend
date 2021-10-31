import {FC, ReactNode, useRef} from "react";
import {Separator} from "../utils/Separator";
import routes from "../routes";
import IconBox from "../icons/IconBox";
import {HamburgerIcon} from "@chakra-ui/icons";
import {useDisclosure} from "@chakra-ui/hooks";
import {useRouter} from "next/router";
import NextLink from "next/link";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Link,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/react";

interface SidebarResponsiveProps {
  logoText: string,
  secondary: boolean,
  children?: ReactNode
}

const SidebarResponsive: FC<SidebarResponsiveProps> = (
  {logoText, secondary}
) => {
  const router = useRouter();
  const mainPanel = useRef();

  const activeRoute = (routeName: string) => router.pathname === routeName ? "active" : "";

  const activeBg = useColorModeValue("white", "gray.700");
  const inactiveBg = useColorModeValue("white", "gray.700");
  const activeColor = useColorModeValue("gray.700", "white");
  const inactiveColor = useColorModeValue("gray.400", "gray.400");

  const createLinks = (routes: any) => {
    return routes.map((prop: any) => {
      return (
        <NextLink href={prop.layout + prop.path} passHref key={prop.layout + prop.path}>
          {activeRoute(prop.layout + prop.path) === "active" ? (
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg={activeBg}
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
                  bg="teal.300"
                  color="white"
                  h="30px"
                  w="30px"
                  me="12px"
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

  let hamburgerColor = useColorModeValue("gray.500", "gray.200");
  if (secondary) hamburgerColor = "white";

  const {isOpen, onOpen, onClose} = useDisclosure();
  const btnRef = useRef();

  return (
    <Flex
      display={{sm: "flex", xl: "none"}}
      // @ts-ignore
      ref={mainPanel}
      alignItems="center"
    >
      <HamburgerIcon
        color={hamburgerColor}
        w="18px"
        h="18px"
        // @ts-ignore
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
      />

      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={"left"}
        // @ts-ignore
        finalFocusRef={btnRef}
      >
        <DrawerOverlay/>
        <DrawerContent
          w="250px"
          maxW="250px"
          borderRadius="8px"
        >
          <DrawerCloseButton
            _focus={{boxShadow: "none"}}
            _hover={{boxShadow: "none"}}
          />

          <DrawerBody maxW="250px" px="1rem">
            <Box maxW="100%" h="100vh">
              <Box>
                <Box pt={"35px"} mb="8px">
                  <NextLink href="/" passHref key="link-to-homepage">
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default SidebarResponsive;
