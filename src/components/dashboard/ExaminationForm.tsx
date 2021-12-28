import {FC, useState} from "react";
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
  useColorModeValue,
  useToast
} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {addExamination} from "../../redux/actions/dashboard";
import {useFormik} from "formik";
import * as Yup from "yup";

interface ExaminationFormProps {
  onClose: () => void,
}

const today = new Date();

const ExaminationForm: FC<ExaminationFormProps> = ({onClose}) => {
  const bgColor = useColorModeValue("white", "gray.700");

  const dispatch = useAppDispatch();
  const patients = useAppSelector(state => state.dashboard.patients.filter(p => p.type === "PATIENT"));
  const doctor = useAppSelector(state => state.auth.user);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const {values, errors, touched, handleChange, handleSubmit, handleBlur} = useFormik({
    initialValues: {
      chosenPatient: null,
      appointmentDate: null,
    },
    validationSchema: Yup.object({
      chosenPatient: Yup.string().required('patient field is required').typeError('please select your patient'),
      appointmentDate: Yup.date().min(today, 'appointment date cannot be in the past')
        .required('appointment date field is required').typeError('invalid date'),
    }),
    onSubmit: (values) => {
      if (doctor) {
        setIsLoading(true);
        dispatch(
          addExamination(
            {doctor: doctor.id, date: String(values.appointmentDate), patient: Number(values.chosenPatient)}
          )
        ).unwrap().then(() => {
          setIsLoading(false);
          if (!toast.isActive("success-toast-new-examination")) {
            toast({
              id: "success-toast-new-examination",
              description: "Successfully created new examination!",
              status: "success",
              duration: 2500,
              isClosable: true,
            });
          }
          setTimeout(() => {
            onClose();
          }, 1000);
          setIsLoading(false);
        }).catch(err => {
          if (!toast.isActive("failure-toast-new-examination")) {
            toast({
              id: "failure-toast-new-examination",
              description: "Failed to create new examination!",
              status: "success",
              duration: 2500,
              isClosable: true,
            });
          }
        });
      }
    }
  });

  const isButtonDisabled = !values.appointmentDate || !values.chosenPatient;

  return (
    <Flex
      flexDirection="column"
      alignSelf="center"
      justifySelf="center"
      maxH="calc(100vh - 10px)"
      overflowY="scroll"
    >
      <Flex
        direction="column"
        w={{base: "445px",}}
        background={"transparent"}
        borderRadius="15px"
        p={{base: "28px 32px", md: "40px"}}
        bg={bgColor}
        boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
      >
        <Heading
          textAlign="center"
          color="teal.300"
          size="xl"
          fontSize="32px"
          mb={{base: "24px", md: "42px"}}
        >
          New Appointment
        </Heading>

        <form onSubmit={handleSubmit} id="examination-form">
          <FormControl>
            <Box pb="16px">
              <FormLabel>
                Appointment Date
              </FormLabel>

              <Input
                id="input-appointment-date"
                type="datetime-local"
                name="appointmentDate"
                min={today.toISOString().slice(0, 16)}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLoading}
                isInvalid={Boolean(touched.appointmentDate && errors.appointmentDate)}
                isRequired
              />

              {touched.appointmentDate && errors.appointmentDate && (
                <FormHelperText>
                  {errors.appointmentDate}
                </FormHelperText>
              )}
            </Box>

            <Box pb="16px">
              <FormLabel>
                Assigned Patient
              </FormLabel>

              {/* to do - dynamic data fetching on scroll */}
              <Select
                id="select-patient"
                placeholder="Select your patient"
                name="chosenPatient"
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLoading}
                isInvalid={Boolean(touched.chosenPatient && errors.chosenPatient)}
                isRequired
              >
                {patients.map((patient) => (
                  <option value={patient.id} key={`patient-option-${patient.id}`}>
                    {patient.first_name} {patient.last_name}
                  </option>
                ))}
              </Select>

              {touched.chosenPatient && errors.chosenPatient && (
                <FormHelperText>
                  {errors.chosenPatient}
                </FormHelperText>
              )}
            </Box>

            <Flex justify="center" mt={{base: "8px", md: "16px"}}>
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
