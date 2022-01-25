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
 * @file: Exports Examinations component rendered in Doctor's dashboard in /dashboard/examinations
 **/
import {FC, useEffect, useState} from "react";
import CardBody from "../../card/CardBody";
import {Flex, SimpleGrid, Text, useColorModeValue} from "@chakra-ui/react";
import CardHeader from "../../card/CardHeader";
import Card from "../../card/Card";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import ExaminationsTableRow from "../../tables/ExaminationsTableRow";
import ExaminationModal from "../../dashboard/ExaminationModal";
import {retrieveExaminations} from "../../../redux/actions/dashboard";
import useTableFilter from "../../../hooks/useTableFilter";
import SearchInput from "../../utils/SearchInput";

const Examinations: FC = () => {
  const textColor = useColorModeValue("gray.700", "white");

  const dispatch = useAppDispatch();
  const examinations = useAppSelector(state => state.dashboard.examinations);

  const [query, setQuery] = useState<string>("");
  const filteredExaminations = useTableFilter(
    examinations,
    ["id", "patient", "status", "recording"],
    query
  );

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

          <SearchInput
            query={query} setQuery={setQuery}
            inputId="patients-search-field"
            mt={{base: "12px", md: 0}}
            mx={{base: 0, md: "8px", lg: "12px"}}
            maxW={{base: "70%", md: "none"}}
            order={{base: 2, md: 1}}
          />

          <Flex pt={{base: "4px", md: 0}} order={{base: 1, md: 2}}>
            <ExaminationModal/>
          </Flex>
        </CardHeader>

        <CardBody>
          <SimpleGrid columns={{sm: 1, md: 2, lg: 2, xl: 3, "2xl": 4}} spacing="8px" w="100%" id="examinations-grid">
            {filteredExaminations.length > 0 && filteredExaminations.map((examination) => {
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
