import {FC, useEffect} from "react";
import CardBody from "../../card/CardBody";
import {Flex, SimpleGrid, Text, useColorModeValue} from "@chakra-ui/react";
import CardHeader from "../../card/CardHeader";
import Card from "../../card/Card";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import ExaminationsTableRow from "../../tables/ExaminationsTableRow";
import ExaminationModal from "../../dashboard/ExaminationModal";
import {retrieveExaminations} from "../../../redux/actions/dashboard";

const Examinations: FC = () => {
  const textColor = useColorModeValue("gray.700", "white");

  const dispatch = useAppDispatch();
  const examinations = useAppSelector(state => state.dashboard.examinations);

  useEffect(() => {
    dispatch(retrieveExaminations(undefined));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex direction="column" pt={{base: "120px", md: "75px"}}>
      <Card overflowX={{sm: "scroll", xl: "hidden"}}>
        <CardHeader p="6px 0px 22px 0px" flexDirection={{base: "column", md: "row"}}>
          <Flex alignItems="center" width="80%" grow={1}>
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              Examinations
            </Text>
          </Flex>

          <Flex pt={{base: "4px", md: 0}}>
            <ExaminationModal/>
          </Flex>
        </CardHeader>

        <CardBody>
          <SimpleGrid columns={{sm: 1, md: 2, lg: 2, xl: 3, "2xl": 4}} spacing="8px" w="100%" id="examinations-grid">
            {examinations.length > 0 && examinations.map((examination) => {
              return (
                <ExaminationsTableRow
                  examination={examination}
                  key={`examination-row-${examination.id}`}
                />
              );
            })}
          </SimpleGrid>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Examinations;
