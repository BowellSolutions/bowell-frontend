/**
* @author: Adam Lisichin
* @file: Exports PatientExaminationDetail component which is rendered in Next.js page /dashboard/examinations/[id]
*/
import {FC, useEffect, useState} from "react";
import {Button, Flex, SimpleGrid, Text, useToast} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {retrieveExaminations} from "../../../redux/actions/dashboard";
import ExaminationDetailInfo from "../../dashboard/ExaminationDetailInfo";
import {Step, Steps, useSteps} from "chakra-ui-steps";
import Card from "../../card/Card";
import CardBody from "../../card/CardBody";
import {getInferenceState} from "../../../api/examinations";
import {FileData} from "../../../api/types";
import RecordingDetails from "../../utils/RecordingDetails";

interface PatientExaminationDetailProps {
  examinationID: number | string,
}

type StateValue = "loading" | "error" | undefined;

enum ExaminationStep {
  UNKNOWN,
  INITIATED,
  COMPLETED,
  FILE_UPLOADED,
  ANALYSIS_STARTED,
  DONE
}

const steps = [
  {label: "Examination Scheduled"},
  {label: "Examination Completed"},
  {label: "File Uploaded"},
  {label: "File Analysis"},
  {label: "Recording Analyzed"},
];

const getStep = (status: string) => {
  if (status === "cancelled") return ExaminationStep.UNKNOWN;
  else if (status === "scheduled") return ExaminationStep.INITIATED;
  else if (status === "completed") return ExaminationStep.COMPLETED;
  else if (status === "file_uploaded" || status === "file_processing") return ExaminationStep.FILE_UPLOADED;
  else if (status === "processing_failed") return ExaminationStep.ANALYSIS_STARTED;
  else if (status === "processing_succeeded") return ExaminationStep.DONE;
  return ExaminationStep.UNKNOWN;
};


const ExaminationDetail: FC<PatientExaminationDetailProps> = ({examinationID}) => {
  const dispatch = useAppDispatch();
  const {examinations, notifications} = useAppSelector(state => state.dashboard);

  const examination = examinations.find(examination => examination.id == examinationID);

  const toast = useToast();

  const {activeStep, setStep} = useSteps({initialStep: 0});
  const [stepState, setStepState] = useState<StateValue>();

  const [analysisResults, setAnalysisResult] = useState<FileData | null>(null);

  const checkAnalysisStatus = (): void => {
    if (examination) {
      getInferenceState(examination.id).then((res) => {
        const {task_id, status} = res.data;
        if (res.data.result) setAnalysisResult(res.data.result);

        toast({
          id: "success-check-analysis",
          description: `Task ${task_id}  ${status}`,
          status: "success",
          duration: 7000,
          isClosable: true,
        });
      }).catch(() => {
        toast({
          id: "error-check-analysis",
          description: "Failed to check analysis state!",
          status: "error",
          duration: 2500,
          isClosable: true,
        });
      });
    }
  };

  useEffect(() => {
    if (examination?.status) {
      setStep(getStep(examination.status));
      if (examination?.status === "file_processing") setStepState("loading");
      else if (examination?.status === "processing_failed" || examination?.status === "cancelled") {
        setStepState("error");
      } else setStepState(undefined);
    }
  }, [examination?.status, setStep]);

  useEffect(() => {
    dispatch(retrieveExaminations(undefined));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // each time client receives notification with type update_examination, display toast
    if (
      examination && examination.recording && notifications.length && notifications[0].type === "update_examination") {
      toast({
        description: notifications[0].message,
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications]);

  if (examination == null) return null;

  return (
    <Flex pt={{base: "120px", md: "75px"}}>
      <SimpleGrid columns={{base: 1, xl: 1}} spacing={4} w="100%">
        <Card>
          <Steps state={stepState} activeStep={activeStep}>
            {steps.map(({label}) => (
              <Step label={label} key={label}/>
            ))}
          </Steps>
        </Card>

        {["file_processing", "file_uploaded", "processing_failed", "processing_succeeded"].some(
          s => s === examination.status
        ) && examination.recording != null && (
          <Card>
            <CardBody alignItems="center">
              <Text fontWeight="bold">
                {examination.recording.name}
              </Text>

              <Flex grow={1}/>

              <Button
                onClick={checkAnalysisStatus}
                colorScheme="teal"
              >
                Check Results
              </Button>
            </CardBody>
          </Card>
        )}

        <Flex direction={{base: "column", lg: "row"}}>
          <ExaminationDetailInfo examination={examination} m={{base: "0 0 16px 0", md: "0 8px 0 0"}}/>

          {analysisResults != null && (
            <Card>
              <CardBody flexDirection="column">
                <RecordingDetails recordingData={analysisResults}/>
              </CardBody>
            </Card>
          )}
        </Flex>
      </SimpleGrid>
    </Flex>
  );
};

export default ExaminationDetail;
