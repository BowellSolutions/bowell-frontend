import {FC} from "react";
import {Box, Button, Flex, Text, useColorModeValue} from "@chakra-ui/react";
import {doctorsRoutes, patientsRoutes} from "../routes";
import {useDashboardContext} from "../context/DashboardContext";
import NextLink from "next/link";
import IconBox from "../icons/IconBox";
import {useRouter} from "next/router";

const SidebarResponsiveLinks: FC = () => {
  const router = useRouter();
  const {type: userType} = useDashboardContext();

  const activeBg = useColorModeValue("white", "gray.700");
  const inactiveBg = useColorModeValue("white", "gray.700");
  const activeColor = useColorModeValue("gray.700", "white");
  const inactiveColor = useColorModeValue("gray.400", "gray.400");

  const routesToMap = userType === "doctor" ? doctorsRoutes : patientsRoutes;

  return (
    <Box>
      {routesToMap && routesToMap.map((prop) => (
        <NextLink href={prop.layout + prop.path} passHref key={prop.layout + prop.path}>
          {router.pathname === prop.layout + prop.path ? (
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
      ))}
    </Box>
  );
};

export default SidebarResponsiveLinks;
