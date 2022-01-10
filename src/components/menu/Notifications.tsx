import {BellIcon} from "@chakra-ui/icons";
import {Box, Flex, Menu, MenuButton, MenuItem, MenuList, Text} from "@chakra-ui/react";
import {FC} from "react";
import ItemContent from "./ItemContent";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {removeNotification} from "../../redux/reducers/dashboard";

interface NotificationsProps {
  color: string,
}

const Notifications: FC<NotificationsProps> = ({color}) => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(state => state.dashboard.notifications);
  const items = notifications.slice(0, 5); // display only 5 latest notifications

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


          <MenuList px="4px" py="8px">
            {items.length === 0 ? (
              <Text fontSize="sm" textAlign="center">
                There are no notifications...
              </Text>
            ) : (
              <Flex flexDirection="column">
                {items.map(({payload}, idx) => (
                  <MenuItem
                    key={`notifications-item-${idx}`}
                    borderRadius="8px" mb={idx !== items.length - 1 ? "4px" : "0"}
                    px="4px" mx={0}
                    closeOnSelect={false}
                  >
                    <ItemContent
                      aName="A"
                      aSrc={""}
                      boldInfo={"Recording"}
                      info={payload}
                      time={"1 minute ago"}
                      deleteItem={() => {
                        dispatch(removeNotification(idx));
                      }}
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
