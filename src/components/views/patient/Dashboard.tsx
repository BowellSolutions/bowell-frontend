/*
* @author: Adam Lisichin
* @file: Exports PatientDashboard component which is rendered in Next.js page /dashboard
*/
import {FC, useEffect} from "react";
import {Flex, Grid, Text, useColorModeValue} from "@chakra-ui/react";
import {retrieveExaminations} from "../../../redux/actions/dashboard";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import Card from "../../card/Card";
import CardBody from "../../card/CardBody";
import CardHeader from "../../card/CardHeader";
import ExaminationCard from "../../dashboard/ExaminationCard";


const PatientDashboard: FC = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const dispatch = useAppDispatch();
  const examinations = useAppSelector(state => state.dashboard.examinations);

  useEffect(() => {
    dispatch(retrieveExaminations(undefined));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex flexDirection="column" pt={{base: "120px", md: "75px"}} id="patient-dashboard">
      <Grid templateColumns={{sm: "1fr", md: "1fr 1fr", lg: "1fr 1.5fr"}} mt="16px" gap="16px">
        <Card>
          <CardHeader mb="12px">
            <Text color={textColor} fontSize="lg" fontWeight="bold">
              Scheduled examinations
            </Text>
          </CardHeader>

          <CardBody>
            {examinations.length > 0 && examinations.filter(ex => ex.status === "scheduled").map((examination) => (
              <ExaminationCard
                verbose={false}
                examination={examination}
                key={`patient-scheduled-examination-${examination.id}`}/>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader mb="12px">
            <Text color={textColor} fontSize="lg" fontWeight="bold">
              Examinations with complete analysis
            </Text>
          </CardHeader>

          <CardBody>
            {examinations.length > 0 && examinations.filter(
              ex => ex.status === "processing_succeeded").map((examination) => (
              <ExaminationCard
                verbose
                examination={examination}
                key={`patient-analyzed-examination-${examination.id}`}
              />
            ))}
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  );
};

export default PatientDashboard;
