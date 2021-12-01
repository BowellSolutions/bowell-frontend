import {Box, Button, Flex, Icon, Td, Text, Tr, useColorModeValue,} from "@chakra-ui/react";
import {FC, useEffect, useState} from "react";
import {FaTrashAlt} from "react-icons/fa";
import {useDisclosure} from "@chakra-ui/hooks";
import {MdExpandLess, MdExpandMore} from "react-icons/md";
import {formatDate} from "../views/utils/format";
import {ExaminationData, FileData} from "../../api/types";
import {deleteFile, getFile} from "../../api/files";
import {useDispatch} from "react-redux";
import {loadRecordings} from "../../redux/actions/dashboard";
import AttachRecordingModal from "../dashboard/AttachRecordingModal";

interface RecordingsTableRowProps {
  fileId: number | string,
  name: string,
  date: string,
  examination: ExaminationData | null,
}

const RecordingsTableRow: FC<RecordingsTableRowProps> = (
  {fileId, name, date, examination}
) => {
  const {isOpen, onToggle} = useDisclosure();
  const [fileDetails, setFileDetails] = useState<FileData | null>(null);

  const textColor = useColorModeValue("gray.500", "white");
  const borderBottom = isOpen ? "0" : "1px";

  const dispatch = useDispatch();

  const handleDetach = (): void => {
    // detach recording from examination
    deleteFile(fileId).then(() => {
      dispatch(loadRecordings());
    }).catch(() => {
      // display some error, popup, alert etc.
    });
  };

  const handleAttach = (): void => {
    // to do
  };

  useEffect(() => {
    if (isOpen && fileDetails == null) {
      getFile(fileId).then(res => {
        setFileDetails(res.data);
      });
    }
  }, [isOpen, fileDetails, fileId]);

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
              textTransform="none"
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
            {formatDate(date)}
          </Text>
        </Td>

        <Td borderBottom={borderBottom}>
          <Text
            fontSize="md"
            color={textColor}
            pb=".5rem"
          >
            {examination == null ? "---" : examination.id}
          </Text>
        </Td>

        <Td borderBottom={borderBottom}>
          {examination != null ? (
            <Button
              p="0px"
              bg="transparent"
              mb={{sm: "10px", md: "0px"}}
              me={{md: "12px"}}
              onClick={handleDetach}
            >
              <Flex color="red.500" cursor="pointer" align="center" p="12px">
                <Icon as={FaTrashAlt} me="4px"/>
                <Text fontSize="sm" fontWeight="semibold">
                  DETACH
                </Text>
              </Flex>
            </Button>
          ) : (
            <AttachRecordingModal recordingId={Number(fileId)}/>
          )}
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
            {
              // iterate over key-value pairs and return data in rows
              fileDetails != null && Object.entries(fileDetails).map(
                ([key, value], idx) => {
                  // data already present in the table
                  if (key === "id" || key === "uploaded_at") return null;
                  else if (String(key).includes("date")) return (
                    <Text as="p" key={`file-row-${key}`} textTransform="none">
                      {`${key}: ${formatDate(value)}`}
                    </Text>
                  );
                  return (
                    <Text as="p" key={`file-row-${key}`} textTransform="none">
                      {`${key}: ${value}`}
                    </Text>
                  );
                }
              )
            }
          </Td>
        </Tr>
      )}
    </>
  );
};

export default RecordingsTableRow;
