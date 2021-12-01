import {ChangeEvent, FC, FormEvent, useState} from "react";
import {Box, Button, Flex, FormControl, FormLabel, Heading, Select} from "@chakra-ui/react";
import {useAppSelector} from "../../redux/hooks";
import {updateExamination} from "../../api/examinations";
import {loadRecordings} from "../../redux/actions/dashboard";
import {useDispatch} from "react-redux";

interface AttachRecordingFormProps {
  onClose: () => void,
  recordingId: number,
}

const AttachRecordingForm: FC<AttachRecordingFormProps> = ({onClose, recordingId}) => {
  const [selectedExamination, setSelectedExamination] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const examinations = useAppSelector(state => state.dashboard.examinations);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (selectedExamination) {
      updateExamination(Number(selectedExamination), {
        recording: recordingId,
      }).then((res) => {
        setError(null);
        dispatch(loadRecordings());
        setTimeout(() => {
          onClose();
        }, 1000);
      }).catch((err) => {
        setError(JSON.stringify(err));
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedExamination(e.target.value);
  };

  return (
    <Flex
      flexDirection="column"
      alignSelf="center"
      justifySelf="center"
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
