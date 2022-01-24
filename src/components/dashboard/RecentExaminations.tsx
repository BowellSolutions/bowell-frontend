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
 * @file: Exports RecentPatients component - examinations coming in 31 days in doctor's dashboard home page
 **/
import {FC} from "react";
import {Button, Flex, Link, Text, useColorModeValue} from "@chakra-ui/react";
import CardHeader from "../card/CardHeader";
import CardBody from "../card/CardBody";
import Card from "../card/Card";
import NextLink from "next/link";
import {useAppSelector} from "../../redux/hooks";
import ExaminationsTableRow from "../tables/ExaminationsTableRow";
import {ExaminationData} from "../../api/types";
import {getDaysBetweenDates} from "../views/utils/format";

const UPCOMING_IN_DAYS = 31;

const condition = (ex: ExaminationData) => {
  const days = getDaysBetweenDates(new Date(ex.date), new Date());
  return 0 < days && days < UPCOMING_IN_DAYS;
};

const RecentExaminations: FC = () => {
  const textColor = useColorModeValue("gray.700", "white");

  const examinations = useAppSelector(state => state.dashboard.examinations);

  return (
    <Card me={{lg: "16px"}} id="recent-examinations">
      <Flex direction="column">
        <CardHeader>
          <Text color={textColor} fontSize="lg" fontWeight="bold">
            Upcoming Medical Examinations
          </Text>
        </CardHeader>

        {examinations.length > 0 && (
          <CardBody mt={{lg: "8px"}} maxHeight="800px" overflowY="scroll">
            <Flex direction="column" w="100%" pr="16px">
              {examinations.filter(condition).map((examination) => (
                <ExaminationsTableRow
                  my="8px"
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
          <Link>
            <Button bgColor="teal.300" color={textColor}>
              View All
            </Button>
          </Link>
        </NextLink>
      </Flex>
    </Card>
  );
};

export default RecentExaminations;

