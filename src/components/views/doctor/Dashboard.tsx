import {FC, useEffect} from "react";
import {Flex, Grid, Text, useColorModeValue} from "@chakra-ui/react";
import CardHeader from "../../card/CardHeader";
import Card from "../../card/Card";
import RecentExaminations from "../../dashboard/RecentExaminations";
import StatisticsBoxes from "../../dashboard/StatisticsBoxes";
import {useAppSelector} from "../../../redux/hooks";
import {useDispatch} from "react-redux";
import {loadExaminations, loadPatients, loadRecordings} from "../../../redux/actions/dashboard";
import RecentRecordings from "../../dashboard/RecentRecordings";
import RecentPatients from "../../dashboard/RecentPatients";


const DoctorDashboard: FC = () => {
  const textColor = useColorModeValue("gray.700", "white");

  const dispatch = useDispatch();
  const patients = useAppSelector(state => state.dashboard.patients);
  const recordings = useAppSelector(state => state.dashboard.recordings);
  const examinations = useAppSelector(state => state.dashboard.examinations);

  useEffect(() => {
    if (!patients.length) {
      dispatch(loadPatients());
    }
  }, [dispatch, patients]);

  useEffect(() => {
    if (!recordings.length) {
      dispatch(loadRecordings());
    }
  }, [dispatch, recordings]);

  useEffect(() => {
    if (!examinations.length) {
      dispatch(loadExaminations());
    }
  }, [dispatch, examinations]);

  return (
    <Flex flexDirection="column" pt={{base: "120px", md: "75px"}}>
      <StatisticsBoxes/>

      <Grid templateColumns={{sm: "1fr", lg: "1.2fr 1.4fr"}} mt="16px" gap="24px">
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
                Recent Processed Recordings
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
