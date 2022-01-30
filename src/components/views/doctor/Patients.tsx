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
 * @file: Exports Patients component rendered in Doctor's dashboard in /dashboard/patients
 **/
import {FC, useEffect, useState} from "react";
import {Flex, Table, Tbody, Text, Th, Thead, Tr, useColorModeValue} from "@chakra-ui/react";
import CardBody from "../../card/CardBody";
import CardHeader from "../../card/CardHeader";
import PatientsTableRow from "../../tables/PatientsTableRow";
import Card from "../../card/Card";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import useTableFilter from "../../../hooks/useTableFilter";
import {retrievePatients} from "../../../redux/actions/dashboard";
import SearchInput from "../../utils/SearchInput";


const Patients: FC = () => {
  const textColor = useColorModeValue("gray.700", "white");

  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const patients = useAppSelector(
    state => state.dashboard.patients.filter(p => p.type === "PATIENT" && p.id !== user?.id)
  );

  const [query, setQuery] = useState<string>(""); // rows will be filtered by this query

  const filteredPatients = useTableFilter(
    patients,
    ["id", "first_name", "last_name", "email"],
    query
  );

  useEffect(() => {
    dispatch(retrievePatients(undefined));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex direction="column" pt={{base: "120px", md: "75px"}}>
      <Card overflowX={{sm: "scroll", xl: "hidden"}} px={{base: "12px", md: "24px"}}>
        <CardHeader p="6px 0px 22px 0px">
          <Flex alignItems="center" grow={1}>
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              Patients
            </Text>
          </Flex>

          <SearchInput
            query={query}
            setQuery={setQuery}
            inputId="patients-search-field"
            ml={{base: "12px", md: 0}}
            maxW={{base: "70%", md: "none"}}
          />
        </CardHeader>

        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".6rem" pl="0px" color="gray.400">
                <Th pl="0px" color="gray.400">
                  Patient ID
                </Th>
                <Th color="gray.400" pl="0px">Patient</Th>
                <Th color="gray.400">Status</Th>
                <Th color="gray.400">Joined At</Th>
                <Th color="gray.400">Examinations</Th>
                <Th color="gray.400"/>
              </Tr>
            </Thead>

            <Tbody>
              {filteredPatients.map((user) => (
                <PatientsTableRow
                  id={user.id}
                  firstName={user.first_name}
                  lastName={user.last_name}
                  email={user.email}
                  isActive={user.is_active}
                  dateJoined={user.date_joined}
                  key={`patient-row-${user.id}`}
                />
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Patients;
