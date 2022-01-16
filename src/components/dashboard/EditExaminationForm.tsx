/**
 * @author: Adam Lisichin
 * @file: Exports ExaminationForm component - used for editing an existing examination.
 **/
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
  Textarea,
  useToast
} from "@chakra-ui/react";
import {ExaminationData, UpdateExaminationData} from "../../api/types";
import {editExamination} from "../../redux/actions/dashboard";
import {useAppDispatch} from "../../redux/hooks";
import {useFormik} from "formik";
import * as Yup from "yup";

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

/**
 * Form with examination optional fields:
 * - height_cm - number between 1 and 999
 * - mass_kg - number between 1 and 999
 * - symptoms - text input
 * - medication - text input
 * - status - text choice field
 * - overview - textarea
 * Calls API on submit, updates given examination and displays proper toast based on response
 */
const EditExaminationForm: FC<EditExaminationFormProps> = ({onClose, examination}) => {
  const initialState: State = {
    height_cm: examination.height_cm,
    mass_kg: examination.mass_kg,
    symptoms: examination.symptoms,
    medication: examination.medication,
    status: examination.status,
    overview: examination.overview,
  };

  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const {errors, touched, handleChange, handleSubmit, handleBlur} = useFormik({
    initialValues: initialState,
    validationSchema: Yup.object({
      height_cm: Yup.number()
        .min(1, "height must be more or equal to 1 [cm]").max(999, "height must be less or equal to 999 [cm]")
        .nullable(),
      mass_kg: Yup.number()
        .min(1, "mass must be more or equal to 1 [kg]").max(999, "mass must be less or equal to 999 [kg]")
        .nullable(),
      symptoms: Yup.string().nullable(),
      medication: Yup.string().nullable(),
      status: Yup.string().nullable(),
      overview: Yup.string().nullable()
    }),
    onSubmit: (values) => {
      setLoading(true);
      dispatch(editExamination({id: examination.id, ...values} as UpdateExaminationData)).unwrap().then(
        () => {
          setLoading(false);
          if (!toast.isActive("success-toast-edit-examination")) {
            toast({
              id: "success-toast-edit-examination",
              description: "Successfully updated examination!",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          }
          setTimeout(() => {
            onClose();
          }, 1000);
        }
      ).catch((err) => {
        setLoading(false);
        if (!toast.isActive("error-toast-edit-examination")) {
          toast({
            id: "error-toast-edit-examination",
            description: "Failed to update examination!",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
      });
    },
  });

  return (
    <Flex
      flexDirection="column"
      alignSelf="center"
      justifySelf="center"
      maxH="calc(100vh - 10px)"
      overflowY="scroll"
      id="edit-examination-form"
    >
      <Flex
        direction="column"
        w={{base: "445px",}}
        background={"transparent"}
        borderRadius="15px"
        p={{base: "28px 32px", md: "40px"}}
        boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
      >
        <Heading
          textAlign="center"
          color="teal.300"
          size="xl"
          fontSize={{base: "28px", md: "32px"}}
          mb={{base: "24px", md: "42px"}}
        >
          Edit Examination #{examination.id}
        </Heading>

        <form onSubmit={handleSubmit}>
          <FormControl>
            <Box pb={{base: "8px", md: "16px"}}>
              <FormLabel htmlFor="height_cm">
                {"Patient's Height [cm]"}
              </FormLabel>

              <Input
                id="input-height-cm"
                type="number" name="height_cm"
                onChange={handleChange} onBlur={handleBlur}
              />

              {touched.height_cm && errors.height_cm && (
                <FormHelperText>
                  {errors.height_cm}
                </FormHelperText>
              )}
            </Box>

            <Box pb={{base: "8px", md: "16px"}}>
              <FormLabel htmlFor="mass_kg">
                {"Patient's Mass [kg]"}
              </FormLabel>

              <Input
                type="number" name="mass_kg"
                onChange={handleChange} onBlur={handleBlur}
              />

              {touched.mass_kg && errors.mass_kg && (
                <FormHelperText>
                  {errors.mass_kg}
                </FormHelperText>
              )}
            </Box>

            <Box pb={{base: "8px", md: "16px"}}>
              <FormLabel htmlFor="status">
                {"Examination Status"}
              </FormLabel>

              <Select
                id="select-status"
                name="status"
                onChange={handleChange} onBlur={handleBlur}
                placeholder="Change examination status"
              >
                <option value={"cancelled"}>cancelled</option>
                <option value={"scheduled"}>scheduled</option>
                <option value={"completed"}>completed</option>
                <option value={"file_uploaded"}>file_uploaded</option>
                <option value={"file_processing"}>file_processing</option>
                <option value={"processing_failed"}>processing_failed</option>
                <option value={"processing_succeeded"}>processing_succeeded</option>
              </Select>

              {touched.status && errors.status && (
                <FormHelperText>
                  {errors.status}
                </FormHelperText>
              )}
            </Box>

            <Box pb={{base: "8px", md: "16px"}}>
              <FormLabel htmlFor="symptoms">
                {"Symptoms"}
              </FormLabel>

              <Input
                type="text" name="symptoms"
                onChange={handleChange} onBlur={handleBlur}
              />

              {touched.symptoms && errors.symptoms && (
                <FormHelperText>
                  {errors.symptoms}
                </FormHelperText>
              )}
            </Box>

            <Box pb={{base: "8px", md: "16px"}}>
              <FormLabel htmlFor="medication">
                {"Medication"}
              </FormLabel>

              <Input
                type="text" name="medication"
                onChange={handleChange} onBlur={handleBlur}
              />

              {touched.medication && errors.medication && (
                <FormHelperText>
                  {errors.medication}
                </FormHelperText>
              )}
            </Box>

            <Box pb={{base: "8px", md: "16px"}}>
              <FormLabel htmlFor="overview">
                {"Overview"}
              </FormLabel>

              <Textarea
                id="textarea-overview" name="overview"
                onChange={handleChange} onBlur={handleBlur}
              />

              {touched.overview && errors.overview && (
                <FormHelperText>
                  {errors.overview}
                </FormHelperText>
              )}
            </Box>

            <Flex justify="center" mt={{base: "8px", md: "16px"}}>
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
