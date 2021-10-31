import {FC} from "react";
import {Flex, Table, Tbody, Th, Thead, Tr, useColorModeValue, Text} from "@chakra-ui/react";
import TablesProjectRow from "../../tables/TablesProjectRow";
import CardBody from "../../card/CardBody";
import CardHeader from "../../card/CardHeader";
import TablesTableRow from "../../tables/TablesTableRow";
import Card from "../../card/Card";
import {tablesProjectData, tablesTableData} from "../../../mocks";


const Recordings: FC = () => {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Flex direction="column" pt={{base: "120px", md: "75px"}}>
      <Card
        overflowX={{sm: "scroll", xl: "hidden"}}
      >
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Files Table
          </Text>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                <Th pl="0px" color="gray.400">
                  Author
                </Th>
                <Th color="gray.400">Function</Th>
                <Th color="gray.400">Status</Th>
                <Th color="gray.400">Employed</Th>
                <Th/>
              </Tr>
            </Thead>
            <Tbody>
              {tablesTableData.map((row) => {
                return (
                  <TablesTableRow
                    name={row.name}
                    // logo={row.logo}
                    email={row.email}
                    subdomain={row.subdomain}
                    domain={row.domain}
                    status={row.status}
                    date={row.date}
                    key={row.name + row.date}
                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
      <Card my="22px" overflowX={{sm: "scroll", xl: "hidden"}}>
        <CardHeader p="6px 0px 22px 0px">
          <Flex direction="column">
            <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
              Projects Table
            </Text>
          </Flex>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px">
                <Th pl="0px" color="gray.400">
                  Companies
                </Th>
                <Th color="gray.400">Budget</Th>
                <Th color="gray.400">Status</Th>
                <Th color="gray.400">Completion</Th>
                <Th/>
              </Tr>
            </Thead>
            <Tbody>
              {tablesProjectData.map((row) => (
                <TablesProjectRow
                  name={row.name}
                  status={row.status}
                  budget={row.budget}
                  progression={row.progression}
                  key={row.name + row.status + row.progression}
                />
              ))
              }
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Recordings;
