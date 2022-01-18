/**
 * @author: Adam Lisichin
 * @file: Exports PatientExaminations component used in patient's view of /dashboard/examinations/
 */
import {FC, useEffect} from "react";
import {Flex, Text, useColorModeValue} from "@chakra-ui/react";
import {retrieveExaminations} from "../../../redux/actions/dashboard";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import Card from "../../card/Card";
import CardHeader from "../../card/CardHeader";
import CardBody from "../../card/CardBody";
import PatientExaminationsTable from "../../tables/PatientExaminationsTable";


const PatientExaminations: FC = () => {
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
        </CardHeader>

        <CardBody>
          <PatientExaminationsTable examinations={examinations}/>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default PatientExaminations;
