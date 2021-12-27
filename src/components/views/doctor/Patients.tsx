import {FC, useEffect, useState} from "react";
import {
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue
} from "@chakra-ui/react";
import {AiOutlineSearch} from "react-icons/ai";
import CardBody from "../../card/CardBody";
import CardHeader from "../../card/CardHeader";
import PatientsTableRow from "../../tables/PatientsTableRow";
import Card from "../../card/Card";
import {useAppSelector} from "../../../redux/hooks";
import {useDispatch} from "react-redux";
import {loadPatients} from "../../../redux/actions/dashboard";
import useTableFilter from "../../../hooks/useTableFilter";


const Patients: FC = () => {
  const textColor = useColorModeValue("gray.700", "white");

  const dispatch = useDispatch();
  const patients = useAppSelector(
    state => state.dashboard.patients.filter(p => p.type === "PATIENT" && p.id !== user?.id)
  );
  const user = useAppSelector(state => state.auth.user);

  const [query, setQuery] = useState<string>(""); // rows will be filtered by this query

  const filteredPatients = useTableFilter(
    patients,
    ["id", "first_name", "last_name", "email"],
    query
  );

  useEffect(() => {
    // load patients on each load because they could have changed
    dispatch(loadPatients());
  }, []);

  return (
    <Flex direction="column" pt={{base: "120px", md: "75px"}}>
      <Card overflowX={{sm: "scroll", xl: "hidden"}}>
        <CardHeader p="6px 0px 22px 0px">
          <Flex alignItems="center" grow={1}>
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              Patients
            </Text>
          </Flex>

          <Flex>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={AiOutlineSearch}/>
              </InputLeftElement>

              <Input
                id="patients-search-field"
                name="search"
                type="search"
                size="md"
                placeholder="Search"
                onChange={(e) => setQuery(e.target.value)}
              />
            </InputGroup>
          </Flex>
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
