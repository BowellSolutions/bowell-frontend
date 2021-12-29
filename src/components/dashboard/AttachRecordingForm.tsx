import {ChangeEvent, FC, FormEvent, useState} from "react";
import {Box, Button, Flex, FormControl, FormLabel, Heading, Select, useToast} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {editExamination, retrieveExaminations} from "../../redux/actions/dashboard";

interface AttachRecordingFormProps {
  onClose: () => void,
  recordingId: number,
}

const AttachRecordingForm: FC<AttachRecordingFormProps> = ({onClose, recordingId}) => {
  const [selectedExamination, setSelectedExamination] = useState<string>("");

  const dispatch = useAppDispatch();
  const examinations = useAppSelector(state => state.dashboard.examinations);

  const toast = useToast();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (selectedExamination) {
      dispatch(
        editExamination({id: Number(selectedExamination), recording: recordingId})
      ).unwrap().then(() => {
        dispatch(retrieveExaminations(undefined));
        if (!toast.isActive("success-toast-attach")) {
          toast({
            id: "success-toast-attach",
            description: "Successfully attached recording!",
            status: "success",
            duration: 2500,
            isClosable: true,
          });
        }
        setTimeout(() => {
          onClose();
        }, 1000);
      }).catch((err) => {
        if (!toast.isActive("error-toast-attach")) {
          toast({
            id: "error-toast-attach",
            description: "Failed to attach the recording!",
            status: "error",
            duration: 2500,
            isClosable: true,
          });
        }
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => setSelectedExamination(e.target.value);

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
        w={{lg: "445px",}}
        background={"transparent"}
        borderRadius="15px"
        p="40px"
        boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
      >
        <Heading
          textAlign="center"
          color="teal.300"
          size="xl"
          fontSize="32px"
          mb="42px"
        >
          Attach Examination
        </Heading>

        <form onSubmit={handleSubmit}>
          <FormControl>
            <Box pb="16px">
              <FormLabel>
                Examination
              </FormLabel>

              <Select placeholder="Choose examination" onChange={handleChange}>
                {examinations.length > 0 && examinations.map((examination) => (
                  <option key={`opt-ex-${examination.id}`} value={examination.id}>
                    Examination (#{examination.id}) --
                    {examination?.patient?.first_name} {examination?.patient?.last_name}
                  </option>
                ))}
              </Select>
            </Box>

            <Flex justify="center" mt="16px">
              <Button
                type="submit"
                loadingText="Sending..."
                bgColor="teal.300"
                isDisabled={selectedExamination === ""}
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


export default AttachRecordingForm;
