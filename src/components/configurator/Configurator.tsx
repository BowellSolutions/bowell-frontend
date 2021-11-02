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
      <DrawerContent>
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
