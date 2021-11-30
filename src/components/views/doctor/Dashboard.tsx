import {FC} from "react";
import {Flex, Grid, Text, useColorModeValue} from "@chakra-ui/react";
import CardHeader from "../../card/CardHeader";
import Card from "../../card/Card";
import RecentExaminations from "../../dashboard/RecentExaminations";
import StatisticsBoxes from "../../dashboard/StatisticsBoxes";
import {useAppSelector} from "../../../redux/hooks";


const DoctorDashboard: FC = () => {
  const textColor = useColorModeValue("gray.700", "white");

  const patients = useAppSelector(state => state.dashboard.patients);
  const recordings = useAppSelector(state => state.dashboard.recordings);

  return (
    <Flex flexDirection="column" pt={{base: "120px", md: "75px"}}>
      <StatisticsBoxes/>

      <Grid templateColumns={{sm: "1fr", lg: "1.2fr 1.4fr"}} mt="16px" gap="24px">
        <Flex direction="column">
          <Card>
            <CardHeader>
              <Text color={textColor} fontSize="lg" fontWeight="bold">
                Recently Added Patients
              </Text>
            </CardHeader>
          </Card>

          <Card mt="24px">
            <CardHeader>
              <Text color={textColor} fontSize="lg" fontWeight="bold">
                Recent Processed Recordings
              </Text>
            </CardHeader>
          </Card>
        </Flex>

        <RecentExaminations/>
      </Grid>
    </Flex>
  );
};

export default DoctorDashboard;
