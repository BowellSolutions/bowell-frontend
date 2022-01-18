/**
 * @author: Adam Lisichin
 * @file: Exports DoctorExaminationDetail component - rendered in doctor's perspective at /dashboard/examination/[id]
 **/
import {Button, Flex, SimpleGrid, Text, useToast} from "@chakra-ui/react";
import {FC, useEffect, useMemo, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import Card from "../../card/Card";
import CardHeader from "../../card/CardHeader";
import CardBody from "../../card/CardBody";
import {FileData} from "../../../api/types";
import {getFile} from "../../../api/files";
import EditExaminationModal from "../../dashboard/EditExaminationModal";
import ProbabilityPlot from "../../dashboard/ProbabilityPlot";
import {startInference} from "../../../api/examinations";
import {retrieveExaminations} from "../../../redux/actions/dashboard";
import ExaminationDetailInfo from "../../dashboard/ExaminationDetailInfo";
import RecordingDetails from "../../utils/RecordingDetails";

interface DoctorExaminationDetailProps {
  examinationID: number | string,
}

const DoctorExaminationDetail: FC<DoctorExaminationDetailProps> = ({examinationID}) => {
  const dispatch = useAppDispatch();
  const {examinations, notifications} = useAppSelector(state => state.dashboard);
  const examination = examinations.find(examination => examination.id == examinationID);

  const [recording, setRecording] = useState<FileData | null>(null);

  const toast = useToast();

  const startAnalysis = (): void => {
    if (examination?.id) {
      startInference(examination.id).then(() => {
        toast({
          id: "success-start-inference",
          description: "Successfully started recording analysis!",
          status: "success",
          duration: 2500,
          isClosable: true,
        });
      }).catch(() => {
        toast({
          id: "failure-start-inference",
          description: "Failed to start recording analysis!",
          status: "error",
          duration: 2500,
          isClosable: true,
        });
      });
    }
  };

  useEffect(() => {
    dispatch(retrieveExaminations(undefined));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // fetch recording if there is a recording attached to examination and it hasn't been fetched yet
    if (examination && examination.recording && !recording) {
      getFile(examination.recording.id).then(res => {
        setRecording(res.data);
      });
    }
  }, [recording, examination, examinationID]);

  useEffect(() => {
    // each time client receives notification with type update_examination, fetch recording from api
    if (
      examination && examination.recording && notifications.length && notifications[0].type === "update_examination") {
      getFile(examination.recording.id).then(res => {
        setRecording(res.data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications]);

  const calculateInitialStep = useMemo(() => {
    // get initial step based on number of points in probability_plot received from API
    // TODO: clean this up later
    if (recording != null && recording.probability_plot != null) {
      const length = recording.probability_plot.length;
      if (length >= 6000_00) {
        return 10;
      } else if (length < 6000_00) {
        return 6;
      } else if (length < 5000_00) {
        return 5;
      } else if (length < 4000_00) {
        return 4;
      } else if (length < 3000_00) {
        return 3;
      } else if (length < 2000_00) {
        return 2;
      } else if (length < 1000_00) {
        return 1;
      } else if (length < 500_00) {
        return 0.5;
      } else if (length < 400_00) {
        return 0.4;
      } else if (length < 300_00) {
        return 0.3;
      } else if (length < 200_00) {
        return 0.2;
      } else if (length < 100_00) {
        return 0.1;
      } else if (length < 60_00) {
        return 0.05;
      } else if (length < 30_00) {
        return 0.01;
      }
    }
    return 1;
  }, [recording]);

  if (examination == null) return null;

  return (
    <Flex pt={{base: "120px", md: "75px"}}>
      <SimpleGrid columns={{base: 1, xl: 2}} spacing={4} w="100%">
        <Flex direction="column">
          <ExaminationDetailInfo examination={examination} modal={EditExaminationModal}/>

          {examination?.recording && recording != null && (
            <Card m={{base: "0 0 8px 0", md: "0 8px 0px 8px"}}>
              <CardBody>
                <Flex grow={1} alignItems="center">
                  <Text fontWeight="bold">
                    {examination.recording.name}
                  </Text>
                </Flex>

                <Button
                  onClick={startAnalysis}
                  colorScheme="teal"
                >
                  Analyze
                </Button>
              </CardBody>
            </Card>
          )}

          {/*
             Show probability vs time graph only if examination is in processing_succeeded state
             and probability_plot is not null
          */}
          {examination.status === "processing_succeeded" && recording != null && recording?.probability_plot && (
            <ProbabilityPlot
              title="Probability vs time graph"
              data={recording.probability_plot}
              initialStep={calculateInitialStep}
              x_key="start"
              y_key="probability"
              x_label="Time [s]"
              y_label="Probability of a having bowel sound"
            />
          )}
        </Flex>

        <Card m={{base: "0 0 8px 0", md: "0 8px 8px 8px"}}>
          <CardHeader>
            <Text fontSize="md" fontWeight="bold" mb="10px" userSelect="none">
              Analysis Result
            </Text>
          </CardHeader>

          <CardBody flexDirection="column">
            {/* Display analysis results only if examination has a recording attached to itself */}
            {
              examination?.recording &&
              recording != null && <RecordingDetails recordingData={recording}/>
            }
          </CardBody>
        </Card>
      </SimpleGrid>
    </Flex>
  );
};

export default DoctorExaminationDetail;
