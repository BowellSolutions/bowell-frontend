import {ChangeEvent, FC, FormEvent, useState} from "react";
import {Box, Button, Flex, FormControl, FormLabel, Heading, Input, Select, Textarea} from "@chakra-ui/react";
import {ExaminationData} from "../../api/types";
import {updateExamination} from "../../api/examinations";
import {loadExaminations} from "../../redux/actions/dashboard";
import {useDispatch} from "react-redux";

interface EditExaminationFormProps {
  onClose: () => void,
  examination: ExaminationData,
}

interface State {
  height_cm?: number | null,
  mass_kg?: number | null,
  symptoms?: string | null,
  medication?: string | null,
  status?: string | null,
  overview?: string | null,
}


const EditExaminationForm: FC<EditExaminationFormProps> = ({onClose, examination}) => {
  const initialState: State = {
    height_cm: examination.height_cm,
    mass_kg: examination.mass_kg,
    symptoms: examination.symptoms,
    medication: examination.medication,
    status: examination.status,
    overview: examination.overview,
  };

  const dispatch = useDispatch();
  const [state, setState] = useState<State>(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    setLoading(true);
    updateExamination(examination.id, state).then((res) => {
      setLoading(false);
      setError(null);
      dispatch(loadExaminations()); // replace with dispatching updated examination
      setTimeout(() => {
        onClose();
      }, 1000);
    }).catch((err) => {
      setLoading(false);
      setError(JSON.stringify(err));
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    setState((prev) => {
      return {...prev, [e.target.id]: e.target.value};
    });
  };

  return (
    <Flex
      flexDirection="column"
      alignSelf="center"
      justifySelf="center"
      id="edit-examination-form"
    >
      <Flex
        direction="column"
        w={{base: "445px",}}
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
          Edit Examination #{examination.id}
        </Heading>

        <form onSubmit={handleSubmit}>
          <FormControl>
            <Box pb="16px">
              <FormLabel>
                {"Patient's Height [cm]"}
              </FormLabel>

              <Input type="number" id="height_cm" value={state.height_cm ?? ""} onChange={handleInputChange}/>
            </Box>

            <Box pb="16px">
              <FormLabel>
                {"Patient's Mass [kg]"}
              </FormLabel>

              <Input type="number" id="mass_kg" value={state.mass_kg ?? ""} onChange={handleInputChange}/>
            </Box>

            <Box pb="16px">
              <FormLabel>
                {"Examination Status"}
              </FormLabel>

              <Select
                onChange={handleInputChange}
                placeholder="Change examination status"
                id="status"
                value={state.status ?? ""}
              >
                <option value={"cancelled"}>cancelled</option>
                <option value={"scheduled"}>scheduled</option>
                <option value={"completed"}>completed</option>
                <option value={"file_uploaded"}>file_uploaded</option>
                <option value={"file_processing"}>file_processing</option>
                <option value={"processing_failed"}>processing_failed</option>
                <option value={"processing_succeeded"}>processing_succeeded</option>
              </Select>
            </Box>

            <Box pb="16px">
              <FormLabel>
                {"Symptoms"}
              </FormLabel>

              <Input type="text" id="symptoms" value={state.symptoms ?? ""} onChange={handleInputChange}/>
            </Box>

            <Box pb="16px">
              <FormLabel>
                {"Medication"}
              </FormLabel>

              <Input type="text" id="medication" value={state.medication ?? ""} onChange={handleInputChange}/>
            </Box>

            <Box pb="16px">
              <FormLabel>
                {"Overview"}
              </FormLabel>

              <Textarea id="overview" value={state.overview ?? ""} onChange={handleInputChange}/>
            </Box>

            <Flex justify="center" mt="16px">
              <Button
                type="submit"
                bgColor="teal.300"
                loadingText="Sending..."
                isLoading={loading}
                isDisabled={loading}
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

export default EditExaminationForm;
