import {BellIcon} from "@chakra-ui/icons";
import {Flex, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {FC} from "react";
import ItemContent from "./ItemContent";


const items = [
  {
    time: "13 minutes ago",
    boldInfo: "Recording (#3)",
    info: "Analysis pending",
    aName: "Wojtek",
    aSrc: ""
  },
  {
    time: "2 days ago",
    boldInfo: "Recording (#5)",
    info: "Analysis cancelled",
    aName: "Hubert",
    aSrc: ""
  },
  {
    time: "3 days ago",
    boldInfo: "Recording (#2)",
    info: "Analysis complete",
    aName: "Gustaw",
    aSrc: ""
  },
];

interface NotificationsProps {
  color: string,
}

const Notifications: FC<NotificationsProps> = ({color}) => {
  return (
    <Menu>
      <MenuButton>
        <BellIcon
          color={color}
          w="22px"
          h="22px"
        />
      </MenuButton>

      <MenuList p="16px 8px">
        <Flex flexDirection="column">
          {items.map(({aName, aSrc, boldInfo, info, time}, idx) => (
            <MenuItem
              key={aName + aSrc}
              borderRadius="8px" mb={idx !== items.length - 1 ? "10px" : "0"}
            >
              <ItemContent
                aName={aName}
                aSrc={aSrc}
                boldInfo={boldInfo}
                info={info}
                time={time}
                key={aName + aSrc + "item"}
              />
            </MenuItem>
          ))}
        </Flex>
      </MenuList>
    </Menu>
  );
};

export default Notifications;
