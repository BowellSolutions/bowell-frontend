import {FC, useEffect} from "react";
import {Flex, Grid, Text, useColorModeValue} from "@chakra-ui/react";
import CardHeader from "../../card/CardHeader";
import Card from "../../card/Card";
import RecentExaminations from "../../dashboard/RecentExaminations";
import StatisticsBoxes from "../../dashboard/StatisticsBoxes";
import RecentRecordings from "../../dashboard/RecentRecordings";
import RecentPatients from "../../dashboard/RecentPatients";
import {useAppDispatch} from "../../../redux/hooks";
import {
  retrieveDoctorStatistics,
  retrieveExaminations,
  retrievePatients,
  retrieveRecordings
} from "../../../redux/actions/dashboard";


const DoctorDashboard: FC = () => {
  const dispatch = useAppDispatch();
  const textColor = useColorModeValue("gray.700", "white");

  useEffect(() => {
    // load recordings, patients, statistics, examinations on mount
    dispatch(retrieveRecordings(undefined));
    dispatch(retrievePatients(undefined));
    dispatch(retrieveDoctorStatistics(undefined));
    dispatch(retrieveExaminations(undefined));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex flexDirection="column" pt={{base: "120px", md: "75px"}}>
      <StatisticsBoxes/>

      <Grid templateColumns={{sm: "1fr", lg: "2fr 1.5fr"}} mt="16px" gap="24px">
        <Flex direction="column">
          <Card>
            <CardHeader mb="12px">
              <Text color={textColor} fontSize="lg" fontWeight="bold">
                Recently Added Patients
              </Text>
            </CardHeader>

            <RecentPatients/>
          </Card>

          <Card mt="24px">
            <CardHeader mb="12px">
              <Text color={textColor} fontSize="lg" fontWeight="bold">
                Recently Processed Recordings
              </Text>
            </CardHeader>

            <RecentRecordings/>
          </Card>
        </Flex>

        <RecentExaminations/>
      </Grid>
    </Flex>
  );
};

export default DoctorDashboard;
