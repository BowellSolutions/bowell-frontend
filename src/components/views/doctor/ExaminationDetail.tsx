import {Button, Divider, Flex, SimpleGrid, Text, useToast} from "@chakra-ui/react";
import {FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import Card from "../../card/Card";
import CardHeader from "../../card/CardHeader";
import CardBody from "../../card/CardBody";
import {FileData} from "../../../api/types";
import {getFile} from "../../../api/files";
import {formatDate} from "../utils/format";
import EditExaminationModal from "../../dashboard/EditExaminationModal";
import ProbabilityPlot from "../../dashboard/ProbabilityPlot";
import {startInference} from "../../../api/examinations";
import {retrieveExaminations} from "../../../redux/actions/dashboard";

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

  if (examination == null) return null;

  return (
    <Flex pt={{base: "120px", md: "75px"}}>
      <SimpleGrid columns={{base: 1, xl: 2}} spacing={4} w="100%">
        <Flex direction="column">
          <Card m={{base: "0 0 8px 0", md: "0 8px 8px 8px"}}>
            <CardHeader>
              <Text fontSize="lg" fontWeight="bold" mb="10px" userSelect="none">
                Examination #{examinationID}
              </Text>

              <Flex grow={1}/>

              <EditExaminationModal examination={examination}/>
            </CardHeader>

            <CardBody flexDirection="column">
              <Text color="gray.400" fontSize="md" fontWeight="semibold">
                Appointment Date:{" "}
                <Text as="span" color="gray.500">{formatDate(examination.date)}</Text>
              </Text>

              <Text color="gray.400" fontSize="md" fontWeight="semibold">
                Examination Status:{" "}
                <Text as="span" color="gray.500">{examination.status}</Text>
              </Text>

              {examination?.analysis_id && (
                <Text color="gray.400" fontSize="md" fontWeight="semibold">
                  Analysis ID:{" "}
                  <Text as="span" color="gray.500">{examination.analysis_id}</Text>
                </Text>
              )}

              <Divider my="8px"/>

              {examination?.patient && (
                <>
                  <Text color="gray.400" fontSize="md" fontWeight="semibold">
                    Patient ID:{" "}
                    <Text as="span" color="gray.500">{examination.id}</Text>
                  </Text>

                  <Text color="gray.400" fontSize="md" fontWeight="semibold">
                    First Name:{" "}
                    <Text as="span" color="gray.500">{examination?.patient?.first_name}</Text>
                  </Text>

                  <Text color="gray.400" fontSize="md" fontWeight="semibold">
                    Last Name:{" "}
                    <Text as="span" color="gray.500">{examination?.patient?.last_name}</Text>
                  </Text>

                  <Text color="gray.400" fontSize="md" fontWeight="semibold">
                    Email:{" "}
                    <Text as="span" color="gray.500">{examination?.patient?.email}</Text>
                  </Text>

                  <Divider my="8px"/>

                  <Text color="gray.400" fontSize="md" fontWeight="semibold">
                    Height [cm]:{" "}
                    <Text as="span" color="gray.500">{examination.height_cm}</Text>
                  </Text>

                  <Text color="gray.400" fontSize="md" fontWeight="semibold">
                    Mass [kg]:{" "}
                    <Text as="span" color="gray.500">{examination.mass_kg}</Text>
                  </Text>

                  <Text color="gray.400" fontSize="md" fontWeight="semibold">
                    Symptoms:{" "}
                    <Text as="span" color="gray.500">{examination.symptoms}</Text>
                  </Text>

                  <Text color="gray.400" fontSize="md" fontWeight="semibold">
                    Medication:{" "}
                    <Text as="span" color="gray.500">{examination.medication}</Text>
                  </Text>

                  <Text color="gray.400" fontSize="md" fontWeight="semibold">
                    Overview:{" "}
                    <Text as="span" color="gray.500">{examination.overview}</Text>
                  </Text>
                </>
              )}
            </CardBody>
          </Card>

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
              recording != null &&
              Object.entries(recording).map(
                ([key, value], idx) => {
                  // data already present in the table
                  if (["id", "uploaded_at", "uploader", "probability_plot"].some(k => k === key)) return null;
                  else if (String(key).includes("date")) return (
                    <Text as="p" key={`file-row-${key}`} textTransform="none" color="gray.400">
                      {`${key}: `}
                      <Text as="span" color="gray.500">
                        {`${formatDate(value)}`}
                      </Text>
                    </Text>
                  );
                  return (
                    <Text as="p" key={`file-row-${key}`} textTransform="none" color="gray.400">
                      {`${key}: `}
                      <Text as="span" color="gray.500">
                        {`${value}`}
                      </Text>
                    </Text>
                  );
                }
              )}
          </CardBody>
        </Card>
      </SimpleGrid>
    </Flex>
  );
};

export default DoctorExaminationDetail;
