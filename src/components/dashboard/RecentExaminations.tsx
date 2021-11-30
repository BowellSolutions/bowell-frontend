import {FC} from "react";
import {Button, Flex, Text, useColorModeValue} from "@chakra-ui/react";
import CardHeader from "../card/CardHeader";
import CardBody from "../card/CardBody";
import Card from "../card/Card";
import NextLink from "next/link";
import {useAppSelector} from "../../redux/hooks";
import ExaminationsTableRow from "../tables/ExaminationsTableRow";


const RecentExaminations: FC = () => {
  const textColor = useColorModeValue("gray.700", "white");

  const examinations = useAppSelector(state => state.dashboard.examinations);

  return (
    <Card me={{lg: "16px"}} id="recent-examinations">
      <Flex direction="column">
        <CardHeader>
          <Text color={textColor} fontSize="lg" fontWeight="bold">
            Recent Medical Examinations
          </Text>
        </CardHeader>

        {examinations.length > 0 && (
          <CardBody mt={{lg: "8px"}} maxHeight="800px" overflowY="scroll">
            <Flex direction="column" w="100%" pr="16px">
              {examinations.map((examination) => (
                <ExaminationsTableRow
                  examination={examination}
                  key={`examination-d-row-${examination.id}`}
                />
              ))}
            </Flex>
          </CardBody>
        )}
      </Flex>

      <Flex mt="8px" justifyContent="flex-end">
        <NextLink passHref href="/dashboard/examinations">
          <Button bgColor="teal.300" color={textColor}>
            View All
          </Button>
        </NextLink>
      </Flex>
    </Card>
  );
};

export default RecentExaminations;

