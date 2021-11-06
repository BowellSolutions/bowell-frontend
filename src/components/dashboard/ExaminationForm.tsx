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

interface ExaminationFormProps {
  onClose: () => void,
}

const ExaminationForm: FC<ExaminationFormProps> = () => {
  const [chosenPatient, setChosenPatient] = useState<string | null>(null);
  const [appointmentDate, setAppointmentDate] = useState<string | null>(null);
  // const [error, setError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const bgColor = useColorModeValue("white", "gray.700");

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAppointmentDate(e.target.value);
  };

  const handlePersonChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setChosenPatient(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // simulate request
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
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
                <option value="1">Joseph Bratan</option>
                <option value="2">Thomas Raven</option>
                <option value="3">Jurij Sobchenko</option>
                <option value="4">Peter Stick</option>
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
