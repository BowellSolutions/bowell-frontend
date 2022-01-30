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
 * @file: Exports Configurator component - openable sidebar on the right side in dashboard
 **/
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  Switch,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import {FC, useRef, useState} from "react";
import {Separator} from "../utils/Separator";

interface ConfiguratorProps {
  secondary: boolean,
  isOpen: boolean,
  onClose: () => void,
  fixed?: boolean,
  isChecked: boolean,
  isTransparent: boolean,
  onTransparent: () => void,
  onOpaque: () => void,
  onSwitch: (value: boolean) => void,
}

/**
 * Component which allows:
 * - setting sidebar type (opaque/transparent)
 * - setting header type (fixed or sticky)
 * - toggling to light/dark mode
 */
const Configurator: FC<ConfiguratorProps> = (
  {
    secondary,
    isOpen,
    onClose,
    isChecked,
    isTransparent,
    onTransparent,
    onOpaque,
    onSwitch,
  }) => {
  const [switched, setSwitched] = useState<boolean>(isChecked);
  const {colorMode, toggleColorMode} = useColorMode();

  const switchNavbarFixed = () => {
    if (switched) {
      onSwitch(false);
      setSwitched(false);
    } else {
      onSwitch(true);
      setSwitched(true);
    }
  };

  const settingsRef = useRef(null);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      finalFocusRef={settingsRef}
      blockScrollOnMount={false}
    >
      <DrawerContent transition="all .05s">
        <DrawerHeader pt="24px" px="24px">
          <DrawerCloseButton/>

          <Text fontSize="xl" fontWeight="bold" mt="16px">
            Configurator
          </Text>

          <Text fontSize="md" mb="16px">
            See your dashboard options.
          </Text>
          <Separator/>
        </DrawerHeader>

        <DrawerBody w="340px" ps="24px" pe="40px">
          <Flex flexDirection="column">
            <Box>
              <Text fontSize="md" fontWeight="600">
                Sidebar Type:
              </Text>

              <Flex pt="10px" pb="5px">
                <Button
                  bg={isTransparent ? "teal.300" : ""}
                  w="50%"
                  p="8px 32px"
                  me="8px"
                  colorScheme="teal"
                  borderColor="teal.300"
                  sx={
                    isTransparent ? {
                      "&:hover": {
                        background: "teal.300"
                      }
                    } : {}
                  }
                  color={isTransparent ? "white" : "teal.300"}
                  variant="outline"
                  fontSize="xs"
                  onClick={onTransparent}
                >
                  Transparent
                </Button>

                <Button
                  type="submit"
                  bg={isTransparent ? "" : "teal.300"}
                  w="50%"
                  p="8px 32px"
                  mb={5}
                  borderColor="teal.300"
                  sx={
                    isTransparent ? {} : {
                      "&:hover": {
                        background: "teal.300"
                      }
                    }
                  }
                  color={isTransparent ? "teal.300" : "white"}
                  variant="outline"
                  fontSize="xs"
                  onClick={onOpaque}
                >
                  Opaque
                </Button>
              </Flex>
            </Box>

            <Box
              display={secondary ? "none" : "flex"}
              justifyContent="space-between "
              mb="16px"
            >
              <Text fontSize="md" fontWeight="600" mb="4px">
                Navbar Fixed
              </Text>

              <Switch
                colorScheme="teal"
                isChecked={switched}
                onChange={switchNavbarFixed}
              />
            </Box>

            <Flex justifyContent="space-between" alignItems="center" mb="24px">
              <Text fontSize="md" fontWeight="600" mb="4px">
                Dark/Light
              </Text>

              <Button onClick={toggleColorMode}>
                Toggle {colorMode === "light" ? "Dark" : "Light"}
              </Button>
            </Flex>

            <Separator/>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Configurator;
