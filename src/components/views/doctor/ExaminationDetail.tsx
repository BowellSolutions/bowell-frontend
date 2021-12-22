import {Divider, Flex, SimpleGrid, Text} from "@chakra-ui/react";
import {FC, useEffect, useState} from "react";
import {useAppSelector} from "../../../redux/hooks";
import Card from "../../card/Card";
import CardHeader from "../../card/CardHeader";
import CardBody from "../../card/CardBody";
import {FileData} from "../../../api/types";
import {getFile} from "../../../api/files";
import {formatDate} from "../utils/format";
import {CartesianGrid, Label, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {data} from "../../../data/graph";
import EditExaminationModal from "../../dashboard/EditExaminationModal";

interface DoctorExaminationDetailProps {
  examinationID: number | string,
}

const DoctorExaminationDetail: FC<DoctorExaminationDetailProps> = ({examinationID}) => {
  const examinations = useAppSelector(state => state.dashboard.examinations);
  const examination = examinations.find(examination => examination.id == examinationID);

  const [recording, setRecording] = useState<FileData | null>(null);

  useEffect(() => {
    if (examination && examination.recording && !recording) {
      getFile(examination.recording.id).then(res => {
        setRecording(res.data);
      });
    }
  }, [recording, examination, examinationID]);

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

          {/* Later change it to something else */}
          {examination.status === "completed" && (
            <Card w="100%" m={{base: "8px 0", md: "8px"}}>
              <CardHeader mb="16px">
                <Text fontSize="lg" fontWeight="bold" mb="10px" userSelect="none">
                  Probability vs time graph
                </Text>
              </CardHeader>

              <ResponsiveContainer width="100%" height="100%" maxHeight={600}>
                <LineChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 0,
                    right: 30,
                    left: 20,
                    bottom: 15,
                  }}
                >
                  <CartesianGrid strokeDasharray="2 2"/>
                  <XAxis dataKey="x">
                    <Label value="Time [s]" offset={-10} position="insideBottom"/>
                  </XAxis>
                  <YAxis>
                    <Label value="Probability of a having bowel sound" offset={5} position="left" angle={-90}/>
                  </YAxis>
                  <Tooltip/>
                  <Line type="monotone" dataKey="y" stroke="#319795" dot={false}/>
                </LineChart>
              </ResponsiveContainer>
            </Card>
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
            {examination?.recording && recording != null && Object.entries(recording).map(
              ([key, value], idx) => {
                // data already present in the table
                if (key === "id" || key === "uploaded_at") return null;
                else if (String(key).includes("date")) return (
                  <Text as="p" key={`file-row-${key}`} textTransform="none">
                    {`${key}: ${formatDate(value)}`}
                  </Text>
                );
                return (
                  <Text as="p" key={`file-row-${key}`} textTransform="none">
                    {`${key}: ${value}`}
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
