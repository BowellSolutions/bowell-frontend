import {BellIcon} from "@chakra-ui/icons";
import {Box, Flex, Menu, MenuButton, MenuItem, MenuList, Text} from "@chakra-ui/react";
import {FC, useState} from "react";
import ItemContent from "./ItemContent";
import {useWebSocketContext} from "../context/WebsocketContext";

interface NotificationsProps {
  color: string,
}

const Notifications: FC<NotificationsProps> = ({color}) => {
  const {notifications} = useWebSocketContext();
  const [items] = useState(notifications.reverse());

  return (
    <Menu>
      {() => (
        <>
          <MenuButton position="relative">
            <BellIcon
              color={color}
              w="22px"
              h="22px"
            />
            {items.length > 0 && (
              <Box
                as={'span'} color={'white'} position={'absolute'} top={'-1px'} right={'-1px'}
                fontSize={'0.8rem'} bgColor={'red'} borderRadius={'lg'} zIndex={9999} p={'1px'}
                w="8px" h="8px"
              />
            )}
          </MenuButton>


          <MenuList p="16px 8px">
            {items.length === 0 ? (
              <Text fontSize="sm" textAlign="center">
                There are no notifications...
              </Text>
            ) : (
              <Flex flexDirection="column">
                {items.map(({payload}, idx) => (
                  <MenuItem
                    key={`notifications-item-${idx}`}
                    borderRadius="8px" mb={idx !== items.length - 1 ? "10px" : "0"}
                  >
                    <ItemContent
                      aName="A"
                      aSrc={""}
                      boldInfo={"Recording"}
                      info={payload}
                      time={"1 minute ago"}
                      key={`notifications-item-${idx}-content`}
                    />
                  </MenuItem>
                ))}
              </Flex>
            )}
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default Notifications;
