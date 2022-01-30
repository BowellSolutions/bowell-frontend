/**
 * @license MIT
 * Copyright (c) 2022 Adam Lisichin, Gustaw Daczkowski, Hubert Decyusz, Wojciech Nowicki
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE
 *
 * @author: Adam Lisichin
 * @file: Exports SidebarLinks component
 **/
import {FC} from "react";
import {UserType} from "../layouts/DashboardLayout";
import {Box, Button, Flex, Text, useColorModeValue, Link} from "@chakra-ui/react";
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
          <Link>
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
          </Link>
        </NextLink>
      ))
      }
    </Box>
  );
};

export default SidebarLinks;
