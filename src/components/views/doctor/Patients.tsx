import {FC} from "react";
import {Flex, Table, Tbody, Text, Th, Thead, Tr, useColorModeValue} from "@chakra-ui/react";
import CardBody from "../../card/CardBody";
import CardHeader from "../../card/CardHeader";
import TablesTableRow from "../../tables/TablesTableRow";
import Card from "../../card/Card";
import {tablesTableData} from "../../../mocks";
import ExaminationModal from "../../dashboard/ExaminationModal";


const Patients: FC = () => {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Flex direction="column" pt={{base: "120px", md: "75px"}}>
      <Card
        overflowX={{sm: "scroll", xl: "hidden"}}
      >
        <CardHeader p="6px 0px 22px 0px">
          <Flex alignItems="center" grow={1}>
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              Patients
            </Text>
          </Flex>

          <ExaminationModal/>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".6rem" pl="0px" color="gray.400">
                <Th pl="0px" color="gray.400">
                  Patient
                </Th>
                <Th color="gray.400">Function</Th>
                <Th color="gray.400">Status</Th>
                <Th color="gray.400">Employed</Th>
                <Th/>
              </Tr>
            </Thead>
            <Tbody>
              {tablesTableData.map((row: any) => {
                return (
                  <TablesTableRow
                    name={row.name}
                    email={row.email}
                    subdomain={row.subdomain}
                    domain={row.domain}
                    status={row.status}
                    date={row.date}
                    key={row.name + row.domain + row.date}
                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Patients;
