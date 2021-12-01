import {FC, FormEvent, useState} from "react";
import {Box, Button, Flex, FormControl, FormLabel, Heading, Input, Select, Textarea} from "@chakra-ui/react";

interface EditExaminationFormProps {
  onClose: () => void,
  examinationId: number,
}

interface State {
  height_cm: '',
  mass_kg: '',
  symptoms: '',
  medication: '',
  status: '',
  overview: '',
}

const initialState: State = {
  height_cm: '',
  mass_kg: '',
  symptoms: '',
  medication: '',
  status: '',
  overview: '',
}

/* to do: connect state and api call */

const EditExaminationForm: FC<EditExaminationFormProps> = ({onClose, examinationId}) => {
  const [state, setState] = useState<State>(initialState);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

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
        boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
      >
        <Heading
          textAlign="center"
          color="teal.300"
          size="xl"
          fontSize="32px"
          mb="42px"
        >
          Edit Examination #{examinationId}
        </Heading>

        <form onSubmit={handleSubmit}>
          <FormControl>
            <Box pb="16px">
              <FormLabel>
                {"Patient's Height [cm]"}
              </FormLabel>

              <Input type="number" onChange={() => {}}/>
            </Box>

            <Box pb="16px">
              <FormLabel>
                {"Patient's Mass [kg]"}
              </FormLabel>

              <Input type="number" onChange={() => {}}/>
            </Box>

            <Box pb="16px">
              <FormLabel>
                {"Examination Status"}
              </FormLabel>

              <Select onChange={() => {}}>
                <option value={1}>forthcoming</option>
                <option value={2}>completed</option>
                <option value={3}>cancelled</option>
              </Select>
            </Box>

            <Box pb="16px">
              <FormLabel>
                {"Symptoms"}
              </FormLabel>

              <Input type="text" onChange={() => {}}/>
            </Box>

            <Box pb="16px">
              <FormLabel>
                {"Medication"}
              </FormLabel>

              <Input type="text" onChange={() => {}}/>
            </Box>

            <Box pb="16px">
              <FormLabel>
                {"Overview"}
              </FormLabel>

              <Textarea onChange={() => {}}/>
            </Box>

            <Flex justify="center" mt="16px">
              <Button
                type="submit"
                loadingText="Sending..."
                bgColor="teal.300"
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
