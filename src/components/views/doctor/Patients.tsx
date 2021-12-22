import {FC, useEffect} from "react";
import {Flex, Table, Tbody, Text, Th, Thead, Tr, useColorModeValue} from "@chakra-ui/react";
import CardBody from "../../card/CardBody";
import CardHeader from "../../card/CardHeader";
import PatientsTableRow from "../../tables/PatientsTableRow";
import Card from "../../card/Card";
import {useAppSelector} from "../../../redux/hooks";
import {useDispatch} from "react-redux";
import {loadPatients} from "../../../redux/actions/dashboard";


const Patients: FC = () => {
  const textColor = useColorModeValue("gray.700", "white");

  const dispatch = useDispatch();
  const patients = useAppSelector(state => state.dashboard.patients.filter(p => p.type === "PATIENT"));
  const user = useAppSelector(state => state.auth.user);

  useEffect(() => {
    // try to load patients on each load because they could have changed
    dispatch(loadPatients());
  }, [dispatch]);

  return (
    <Flex direction="column" pt={{base: "120px", md: "75px"}}>
      <Card overflowX={{sm: "scroll", xl: "hidden"}}>
        <CardHeader p="6px 0px 22px 0px">
          <Flex alignItems="center" grow={1}>
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              Patients
            </Text>
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
              {patients.filter(p => p.id !== user?.id).map((user) => (
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
