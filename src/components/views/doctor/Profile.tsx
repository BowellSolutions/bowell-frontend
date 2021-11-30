import {FC, useEffect} from "react";
import {Avatar, Box, Button, Flex, Grid, Text, useColorModeValue} from "@chakra-ui/react";
import CardBody from "../../card/CardBody";
import CardHeader from "../../card/CardHeader";
import Card from "../../card/Card";
import {useAppSelector} from "../../../redux/hooks";
import {ExaminationData, UserData} from "../../../api/types";
import {useDispatch} from "react-redux";
import {loadExaminations, loadPatients} from "../../../redux/actions/dashboard";
import NextLink from "next/link";

interface PatientsProps {
  patients: UserData[],
}


const Patients: FC<PatientsProps> = ({patients}) => {
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");

  return (
    <>
      {patients && patients.map((patient, idx) => (
        <Flex
          justifyContent="space-between" mb="21px"
          key={`profile-patient-container-${idx}`}
          bg={bgColor}
          px="8px" py="8px"
          borderRadius="15px"
          w="100%"
          cursor="default"
          _hover={{shadow: 'md', transition: "box-shadow 0.3s"}}
        >
          <Flex align="center">
            <Avatar
              src=""
              w="50px"
              h="50px"
              borderRadius="15px"
              me="10px"
            />
            <Flex direction="column">
              <Text fontSize="sm" color={textColor} fontWeight="bold" textTransform="none">
                {patient?.first_name}{" "}{patient?.last_name}
              </Text>
              <Text fontSize="xs" color="gray.500" fontWeight="400" textTransform="none">
                {patient?.email}
              </Text>
            </Flex>
          </Flex>

          <Button bg="transparent" variant="no-hover">
            <Text
              fontSize="sm"
              fontWeight="600"
              color="teal.300"
              alignSelf="center"
            >
              VIEW
            </Text>
          </Button>
        </Flex>
      ))}
    </>
  );
};

interface ExaminationsProps {
  examinations: ExaminationData[],
}

const Examinations: FC<ExaminationsProps> = ({examinations}) => {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");

  return (
    <>
      {examinations.length && examinations.map((examination, idx) => (
        <Flex
          justifyContent="space-between" mb="21px"
          shadow="sm" p={{sm: "4px", md: "8px"}} borderRadius="16px"
          border="1px solid"
          borderColor={borderColor}
          bgColor={bgColor}
          key={`examinations-container-${idx}`}
          _hover={{shadow: 'md', transition: "box-shadow 0.3s"}}
          cursor="default"
        >
          <Flex align="center">
            <Flex direction="column">
              <Text fontSize="sm" color={textColor} fontWeight="bold" textTransform="none">
                Examination #{examination.id}
              </Text>

              <Text fontSize="sm" color="gray.500" fontWeight="semibold" textTransform="none">
                Patient:{" "}
                <Text as="span" color="gray.500" fontWeight="semibold">
                  {examination?.patient?.first_name} {examination?.patient?.last_name}
                </Text>
              </Text>

              <Text fontSize="sm" color="gray.500" fontWeight="semibold" textTransform="none">
                Status:{" "}
                <Text as="span" color="gray.500">{examination.status}</Text>
              </Text>
            </Flex>
          </Flex>

          <Button pr="4px" bg="transparent" variant="no-hover">
            <Text
              fontSize="sm"
              fontWeight="600"
              color="teal.300"
              alignSelf="center"
            >
              VIEW
            </Text>
          </Button>
        </Flex>
      ))}
    </>
  );
};


const Profile: FC = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const bgProfile = useColorModeValue(
    "hsla(0, 0%, 100%, .8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );
  const borderProfileColor = useColorModeValue(
    "white",
    "rgba(255, 255, 255, 0.31)"
  );
  const emailColor = useColorModeValue("gray.400", "gray.300");

  const dispatch = useDispatch();
  const user = useAppSelector(state => state.auth.user);
  const patients = useAppSelector(state => state.dashboard.patients);
  const examinations = useAppSelector(state => state.dashboard.examinations);

  useEffect(() => {
    // load patients if they are missing
    if (!patients.length) {
      dispatch(loadPatients());
    }
  }, [patients, dispatch]);

  useEffect(() => {
    // load examinations if they are missing
    if (!examinations.length) {
      dispatch(loadExaminations());
    }
  }, [examinations, dispatch]);

  return (
    <Flex direction="column">
      <Box
        borderRadius="15px"
        px="0px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        align="center"
      >
        <Box
          w="100%"
          h={{sm: "300px", md: "250px"}}
          borderRadius="25px"
          position="relative"
          display="flex"
          justifyContent="center"
        >
          <Flex
            direction={{sm: "column", md: "row"}}
            mx="1.5rem"
            maxH="330px"
            w={{sm: "90%", xl: "95%"}}
            justifyContent={{sm: "center", md: "space-between"}}
            align="center"
            backdropFilter="saturate(200%) blur(50px)"
            position="absolute"
            boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
            border="2px solid"
            borderColor={borderProfileColor}
            bg={bgProfile}
            p="24px"
            borderRadius="20px"
            transform={{
              sm: "translateY(40%)",
              md: "translateY(75%)",
              lg: "translateY(60%)",
            }}
          >
            <Flex
              align="center"
              mb={{sm: "10px", md: "0px"}}
              direction={{sm: "column", md: "row"}}
              w={{sm: "100%"}}
              textAlign={{sm: "center", md: "start"}}
            >
              <Avatar
                me={{md: "22px"}}
                src=""
                w="80px"
                h="80px"
                borderRadius="15px"
              />

              <Flex direction="column" maxWidth="100%">
                <Text
                  fontSize={{sm: "lg", lg: "xl"}}
                  color={textColor}
                  fontWeight="bold"
                  ms={{sm: "8px", md: "0px"}}
                  textTransform="none"
                >
                  {user?.first_name} {user?.last_name}
                </Text>

                <Text
                  fontSize={{sm: "sm", md: "md"}}
                  color={emailColor}
                  fontWeight="semibold"
                  textTransform="none"
                >
                  {user?.email}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Box>

      <Grid templateColumns={{sm: "1fr", xl: "repeat(3, 1fr)"}} gap="22px">
        <Card p="16px" my={{sm: "24px", xl: "0px"}} id="doctor-profile-info">
          <CardHeader p="12px 5px" mb="12px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Profile Information
            </Text>
          </CardHeader>

          <CardBody px="5px">
            <Flex direction="column">
              <Flex align="center" mb="18px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  First Name:{" "}
                </Text>
                <Text fontSize="md" color="gray.500" fontWeight="400" textTransform="none">
                  {user?.first_name}
                </Text>
              </Flex>

              <Flex align="center" mb="18px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  Last Name:{" "}
                </Text>
                <Text fontSize="md" color="gray.500" fontWeight="400" textTransform="none">
                  {user?.last_name}
                </Text>
              </Flex>

              <Flex align="center" mb="18px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  Email:{" "}
                </Text>
                <Text fontSize="md" color="gray.500" fontWeight="400" textTransform="none">
                  {user?.email}
                </Text>
              </Flex>
            </Flex>
          </CardBody>
        </Card>

        <Card p="16px" id="doctor-profile-examinations">
          <CardHeader p="12px 5px" mb="12px">
            <Text fontSize="lg" color={textColor} fontWeight="bold" flexGrow={1}>
              Examinations
            </Text>
          </CardHeader>

          <CardBody px="5px">
            <Flex direction="column" w="100%">
              {examinations.length > 0 && <Examinations examinations={examinations}/>}
            </Flex>
          </CardBody>

          <Flex justifyContent="flex-end" alignItems="center">
            <NextLink passHref href="/dashboard/examinations">
              <Button bgColor="teal.300" color={textColor}>
                View All
              </Button>
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
              {patients && patients.length > 0 && <Patients patients={patients}/>}
            </Flex>
          </CardBody>

          <Flex justifyContent="flex-end" alignItems="center">
            <NextLink passHref href="/dashboard/patients">
              <Button bgColor="teal.300" color={textColor}>
                View All
              </Button>
            </NextLink>
          </Flex>
        </Card>
      </Grid>
    </Flex>
  );
};

export default Profile;
