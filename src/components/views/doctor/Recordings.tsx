import {FC} from "react";
import {Flex, Table, Tbody, Text, Th, Thead, Tr, useColorModeValue} from "@chakra-ui/react";
import CardBody from "../../card/CardBody";
import CardHeader from "../../card/CardHeader";
import Card from "../../card/Card";
import {recordingsData} from "../../../mocks/doctorDashboard";
import FileUpload from "../../dashboard/FileUpload";
import FilesTableRow from "../../tables/FilesTableRow";


const Recordings: FC = () => {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Flex direction="column" pt={{base: "120px", md: "75px"}}>
      <Card
        overflowX={{sm: "scroll", xl: "hidden"}}
      >
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Uploaded Files
          </Text>
        </CardHeader>

        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                <Th color="gray.400" pl="0px">File ID</Th>
                <Th color="gray.400">Filename</Th>
                <Th color="gray.400">Uploaded At</Th>
                <Th/>
                <Th/>
              </Tr>
            </Thead>

            <Tbody>
              {recordingsData.map((row) => {
                return (
                  <FilesTableRow
                    fileId={row.id}
                    name={row.name}
                    date={String(row.date)}
                    key={row.name + row.date}
                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      <Card my="24px">
        <CardHeader>
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Upload New File
          </Text>
        </CardHeader>

        <FileUpload/>
      </Card>
    </Flex>
  );
};

export default Recordings;
