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
