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
import {Button, Flex, Grid, Link, Text, useColorModeValue} from "@chakra-ui/react";
import CardBody from "../../card/CardBody";
import CardHeader from "../../card/CardHeader";
import Card from "../../card/Card";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import NextLink from "next/link";
import {retrieveExaminations, retrievePatients, retrieveRecordings} from "../../../redux/actions/dashboard";
import ProfileHeader from "../../dashboard/ProfileHeader";
import ProfileInfo from "../../dashboard/ProfileInfo";
import ProfilePatients from "../../dashboard/ProfilePatients";
import ProfileExaminations from "../../dashboard/ProfileExaminations";

const ITEMS_LIMIT = 5;

const Profile: FC = () => {
  const textColor = useColorModeValue("gray.700", "white");

  const dispatch = useAppDispatch();
  const patients = useAppSelector(state => state.dashboard.patients.filter(p => p.type === "PATIENT"));
  const examinations = useAppSelector(state => state.dashboard.examinations);

  useEffect(() => {
    dispatch(retrieveExaminations(undefined));
    dispatch(retrieveRecordings(undefined));
    dispatch(retrievePatients(undefined));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex direction="column">
      <ProfileHeader/>

      <Grid templateColumns={{sm: "1fr", xl: "repeat(3, 1fr)", "2xl": "0.7fr 1fr 1fr"}} gap="22px">
        <ProfileInfo id="doctor-profile-info"/>

        <Card p="16px" id="doctor-profile-examinations">
          <CardHeader p="12px 5px" mb="12px">
            <Text fontSize="lg" color={textColor} fontWeight="bold" flexGrow={1}>
              Examinations
            </Text>
          </CardHeader>

          <CardBody px="5px">
            <Flex direction="column" w="100%">
              {examinations.length > 0 && (
                <ProfileExaminations examinations={[...examinations].splice(0, ITEMS_LIMIT)}/>
              )}
            </Flex>
          </CardBody>

          <Flex justifyContent="flex-end" alignItems="center">
            <NextLink passHref href="/dashboard/examinations">
              <Link>
                <Button bgColor="teal.300" color={textColor}>
                  View All
                </Button>
              </Link>
            </NextLink>
          </Flex>
        </Card>

        <Card p="16px">
          <CardHeader p="12px 5px" mb="12px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Patients
            </Text>
          </CardHeader>

          <CardBody px="5px">
            <Flex direction="column" w="100%">
              {patients && patients.length > 0 && (
                <ProfilePatients patients={[...patients].splice(0, ITEMS_LIMIT)}/>
              )}
            </Flex>
          </CardBody>

          <Flex justifyContent="flex-end" alignItems="center">
            <NextLink passHref href="/dashboard/patients">
              <Link>
                <Button bgColor="teal.300" color={textColor}>
                  View All
                </Button>
              </Link>
            </NextLink>
          </Flex>
        </Card>
      </Grid>
    </Flex>
  );
};

export default Profile;
