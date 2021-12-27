import {FC} from "react";
import {Box, Flex, SimpleGrid, Text, useColorModeValue} from "@chakra-ui/react";
import {useAppSelector} from "../../redux/hooks";
import {FileData} from "../../api/types";
import NextLink from "next/link";

/*
  Checks if recording is assigned to any examination, and whether its status is completed
*/
const condition = (rec: FileData) => {
  return rec.examination != null && rec.examination.status === "completed";
};


const RecentRecordings: FC = () => {
  const recordings = useAppSelector(state => state.dashboard.recordings);

  const bgColor = useColorModeValue("#F8F9FA", "gray.800");
  const nameColor = useColorModeValue("gray.500", "white");

  return (
    <SimpleGrid columns={{sm: 1, md: 2, lg: 1, xl: 2}} spacing={{sm: "8px", md: "12px", lg: "16px"}}>
      {recordings.length > 0 && recordings.filter(condition).map((recording) => (
        <Box
          px="16px" py="12px"
          bg={bgColor} borderRadius="12px" w="100%"
          key={`recent-patient-${recording.id}`}
          cursor="default"
          _hover={{shadow: 'md', transition: "box-shadow 0.3s"}}
        >
          <Flex justify="space-between" w="100%">
            <Flex direction="column" maxWidth="100%">
              <NextLink href={`/dashboard/recordings/${encodeURIComponent(recording.id)}`}>
                <Text
                  color={nameColor} fontSize="md" fontWeight="bold" mb="10px"
                  _hover={{textDecoration: "underline", cursor: "pointer"}}
                >
                  {recording.name}
                </Text>
              </NextLink>

              <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                Examination ID:{" "}
                <Text as="span" color="gray.500">{recording?.examination?.id}</Text>
              </Text>

              <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                Status:{" "}
                <Text as="span" color="gray.500">{recording?.examination?.status}</Text>
              </Text>
            </Flex>
          </Flex>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default RecentRecordings;
