import {ChangeEvent, FC, FormEvent, useState} from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  useColorModeValue
} from "@chakra-ui/react";
import {useAppSelector} from "../../redux/hooks";
import {createExamination} from "../../api/examinations";
import {loadExaminations} from "../../redux/actions/dashboard";
import {useDispatch} from "react-redux";

interface ExaminationFormProps {
  onClose: () => void,
}

const ExaminationForm: FC<ExaminationFormProps> = ({onClose}) => {
  const [chosenPatient, setChosenPatient] = useState<string | null>(null);
  const [appointmentDate, setAppointmentDate] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const patients = useAppSelector(state => state.dashboard.patients);
  const doctor = useAppSelector(state => state.auth.user);

  const bgColor = useColorModeValue("white", "gray.700");

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAppointmentDate(e.target.value);
  };

  const handlePersonChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setChosenPatient(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    createExamination(
      {doctor: doctor?.id, date: appointmentDate, patient: chosenPatient}
    ).then((res) => {
      setIsLoading(false);
      dispatch(loadExaminations()); // better way would be to dispatch only single element
      // to do display message
      setTimeout(() => {
        onClose();
      }, 1000);
    }).catch(err => setError(JSON.stringify(err)));
  };

  const isDateTimeInvalid = () => {
    return !!(appointmentDate && new Date().getTime() >= new Date(appointmentDate as string).getTime());
  };

  const isButtonDisabled = Boolean(!appointmentDate || isDateTimeInvalid() || !chosenPatient);

  return (
    <Flex
      flexDirection="column"
      alignSelf="center"
      justifySelf="center"
    >
      <Flex
        direction="column"
        w={{base: "445px",}}
        background={"transparent"}
        borderRadius="15px"
        p="40px"
        bg={bgColor}
        boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
      >
        <Heading
          textAlign="center"
          color="teal.300"
          size="xl"
          fontSize="32px"
          mb="42px"
        >
          New Appointment
        </Heading>

        <form onSubmit={handleSubmit}>
          <FormControl>
            <Box pb="16px">
              <FormLabel>
                Appointment Date
              </FormLabel>

              <Input
                type="datetime-local"
                onChange={handleDateChange}
                disabled={isLoading}
                isRequired
                isInvalid={isDateTimeInvalid()}
              />

              {isDateTimeInvalid() && (
                <FormHelperText>
                  Invalid date
                </FormHelperText>
              )}
            </Box>

            <Box pb="16px">
              <FormLabel>
                Assigned Patient
              </FormLabel>


              {/* to do - dynamic data fetching on scroll */}
              <Select
                placeholder="Select your patient"
                onChange={handlePersonChange}
                disabled={isLoading}
                isRequired
              >
                {patients.filter(p => p.type === "PATIENT").map((patient) => (
                  <option value={patient.id} key={`patient-option-${patient.id}`}>
                    {patient.first_name} {patient.last_name}
                  </option>
                ))}
              </Select>
            </Box>

            <Flex justify="center" mt="16px">
              <Button
                type="submit"
                isLoading={isLoading}
                loadingText="Sending..."
                bgColor="teal.300"
                isDisabled={isButtonDisabled}
              >
                Submit
              </Button>
            </Flex>
          </FormControl>
        </form>
      </Flex>
    </Flex>
  );
};

export default ExaminationForm;
