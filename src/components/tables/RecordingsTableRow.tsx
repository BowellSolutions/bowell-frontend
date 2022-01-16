import {Box, Flex, Icon, Link, Td, Text, Tr, useColorModeValue,} from "@chakra-ui/react";
import {FC, useEffect, useState} from "react";
import {useDisclosure} from "@chakra-ui/hooks";
import {MdExpandLess, MdExpandMore} from "react-icons/md";
import {formatDate} from "../views/utils/format";
import {ExaminationData, FileData} from "../../api/types";
import {getFile} from "../../api/files";
import AttachRecordingModal from "../dashboard/AttachRecordingModal";
import NextLink from "next/link";
import ConfirmDetachModal from "../dashboard/ConfirmDetachModal";
import RecordingDetails from "../utils/RecordingDetails";

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
                fontWeight="600"
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
            {examination == null ? "---" : (
              <NextLink href={`/dashboard/examinations/${encodeURIComponent(examination.id)}`}>
                <Link fontWeight={600} _hover={{textDecoration: "underline"}}>
                  {examination.id}
                </Link>
              </NextLink>
            )}
          </Text>
        </Td>

        <Td borderBottom={borderBottom}>
          {examination != null ? (
            <ConfirmDetachModal recordingId={Number(fileId)}/>
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
              fileDetails != null && <RecordingDetails recordingData={fileDetails}/>
            }
          </Td>
        </Tr>
      )}
    </>
  );
};

export default RecordingsTableRow;
