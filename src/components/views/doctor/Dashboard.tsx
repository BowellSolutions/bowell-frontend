/**
 * @license MIT
 * Copyright (c) 2022 Adam Lisichin, Gustaw Daczkowski, Hubert Decyusz, Wojciech Nowicki
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE
 *
 * @author: Adam Lisichin
 * @file:
 **/
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
