import {FC} from "react";
import {Button, Flex, Text, useColorModeValue} from "@chakra-ui/react";
import CardHeader from "../card/CardHeader";
import CardBody from "../card/CardBody";
import {examinationsData} from "../../mocks/doctorDashboard";
import ExaminationsRow from "../tables/ExaminationsRow";
import Card from "../card/Card";
import NextLink from "next/link";


const RecentExaminations: FC = () => {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card me={{lg: "16px"}}>
      <Flex direction="column">
        <CardHeader>
          <Text color={textColor} fontSize="lg" fontWeight="bold">
            Recent Medical Examinations
          </Text>
        </CardHeader>

        <CardBody mt={{lg: "8px"}} maxHeight="800px" overflowY="scroll">
          <Flex direction="column" w="100%" pr="16px">
            {examinationsData.map((row) => (
              <ExaminationsRow
                name={row.name}
                date={String(row.date)}
                email={row.email}
                status={row.status}
                recording={row.recording}
                key={row.name + String(row.date) + row.status}
              />
            ))}
          </Flex>
        </CardBody>

        <Flex mt="8px" justifyContent="flex-end">
          <NextLink passHref href="/dashboard/examinations">
            <Button bgColor="teal.300" color={textColor}>
              View All
            </Button>
          </NextLink>
        </Flex>
      </Flex>
    </Card>
  );
};

export default RecentExaminations;

