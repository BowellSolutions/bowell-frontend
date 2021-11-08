import {Badge, Box, Button, Collapse, Flex, Icon, IconButton, Text, useColorModeValue,} from "@chakra-ui/react";
import {FaPencilAlt} from "react-icons/fa";
import React, {FC} from "react";
import {MdExpandLess, MdExpandMore} from "react-icons/md";
import {useDisclosure} from "@chakra-ui/hooks";
import FileUpload from "../dashboard/FileUpload";
import {DeleteIcon} from "@chakra-ui/icons";

interface BillingRowProps {
  name: string,
  date: Date | string,
  email: string,
  status: string,
  recording: null | any,
}

const ExaminationsRow: FC<BillingRowProps> = (
  {name, date, email, status, recording}
) => {
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");
  const nameColor = useColorModeValue("gray.500", "white");

  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  const {isOpen, onToggle} = useDisclosure();

  const getStatusColor = (): string => {
    switch (status) {
      case "File Uploaded":
        return "";
      case "Cancelled":
        return "";
      default:
        return "";
    }
  };

  const handleDeleteFile = (fileId: string | number): void => {
  };

  return (
    <Box px="24px" py="12px" bg={bgColor} my="8px" borderRadius="12px">
      <Flex justify="space-between" w="100%">
        <Flex direction="column" maxWidth="70%">
          <Text color={nameColor} fontSize="md" fontWeight="bold" mb="10px">
            {name}
          </Text>

          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Email:{" "}
            <Text as="span" color="gray.500">{email}</Text>
          </Text>

          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Appointment Date:{" "}
            <Text as="span" color="gray.500">{date}</Text>
          </Text>

          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Status:{" "}
            <Text as="span" color="gray.500">{status}</Text>
          </Text>

          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Recording:{" "}

            {recording != null ? (
              <Text as="span" color="green.500">{recording.name}</Text>
            ) : (
              <Text as="span" color="red.500">None</Text>
            )}

          </Text>
        </Flex>

        <Flex
          direction={{sm: "column", md: "row"}}
          align="center"
          p={{md: "24px"}}
        >
          <Flex
            alignItems="center"
            mb={{sm: "10px", md: "0px"}}
            me={{md: "12px"}}
          >
            <Badge
              bg={status === "File Uploaded" ? "green.400" : bgStatus}
              color={status === "File Uploaded" ? "white" : colorStatus}
              fontSize="16px"
              p="3px 10px"
              borderRadius="8px"
            >
              {status}
            </Badge>
          </Flex>

          <Button p="0px" bg="transparent">
            <Flex color={textColor} cursor="pointer" align="center" p="12px">
              <Icon as={FaPencilAlt} me="4px"/>
              <Text fontSize="sm" fontWeight="semibold">
                EDIT
              </Text>
            </Flex>
          </Button>
        </Flex>
      </Flex>

      <Box>
        <Icon
          as={isOpen ? MdExpandLess : MdExpandMore}
          h="24px"
          w="24px"
          ml="-6px"
          onClick={onToggle}
        />
      </Box>

      <Collapse in={isOpen} animateOpacity>
        <Box
          p="24px"
          mt="4"
          rounded="md"
          shadow="md"
        >
          {recording != null ? (
            <Flex
              flexDirection="row"
              alignItems="center"
            >
              <Text as="p">
                {recording.name}
              </Text>

              <IconButton
                ml="8px"
                h="32px"
                w="32px"
                colorScheme="red"
                aria-label="Remove file"
                icon={<DeleteIcon/>}
                onClick={() => handleDeleteFile(recording.id)}
              />
            </Flex>
          ) : (
            <>
              <Text fontSize="lg" color={textColor}>
                Attach File
              </Text>

              <FileUpload/>
            </>
          )}
        </Box>
      </Collapse>

    </Box>
  );
};

export default ExaminationsRow;
