import {Badge, Box, Button, Flex, Icon, Td, Text, Tr, useColorModeValue,} from "@chakra-ui/react";
import {FC} from "react";
import {FaTrashAlt} from "react-icons/fa";
import {useDisclosure} from "@chakra-ui/hooks";
import {MdExpandLess, MdExpandMore} from "react-icons/md";

interface FilesTableRowProps {
  fileId: number | string,
  name: string,
  date: string,
}

const TablesTableRow: FC<FilesTableRowProps> = (
  {fileId, name, date}
) => {
  const textColor = useColorModeValue("gray.500", "white");

  const {isOpen, onToggle} = useDisclosure();

  const borderBottom = isOpen ? "0" : "1px";

  const handleDelete = (): void => {
  };

  return (
    <>
      <Tr>
        <Td minWidth={{sm: "50px"}} pl="0px" borderBottom={borderBottom}>
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Flex direction="column">
              <Text
                fontSize="md"
                fontWeight="bold"
                color={textColor}
                minWidth="100%"
              >
                {fileId}
              </Text>
            </Flex>
          </Flex>
        </Td>

        <Td minWidth={{sm: "200px"}} borderBottom={borderBottom}>
          <Flex direction="column">
            <Text
              fontSize="md"
              color={textColor}
            >
              {name}
            </Text>
          </Flex>
        </Td>

        <Td borderBottom={borderBottom}>
          <Text
            fontSize="md"
            color={textColor}
            pb=".5rem"
          >
            {date}
          </Text>
        </Td>

        <Td borderBottom={borderBottom}>
          <Button
            p="0px"
            bg="transparent"
            mb={{sm: "10px", md: "0px"}}
            me={{md: "12px"}}
            onClick={handleDelete}
          >
            <Flex color="red.500" cursor="pointer" align="center" p="12px">
              <Icon as={FaTrashAlt} me="4px"/>
              <Text fontSize="sm" fontWeight="semibold">
                DELETE
              </Text>
            </Flex>
          </Button>
        </Td>

        <Td borderBottom={borderBottom}>
          <Box>
            <Icon
              as={isOpen ? MdExpandLess : MdExpandMore}
              h="24px"
              w="24px"
              ml="-6px"
              onClick={onToggle}
            />
          </Box>
        </Td>
      </Tr>

      {isOpen && (
        <Tr>
          <Td colSpan={6} borderTop={0}>
            {/* More details about file, associated examinations */}
          </Td>
        </Tr>
      )}
    </>
  );
};

export default TablesTableRow;
