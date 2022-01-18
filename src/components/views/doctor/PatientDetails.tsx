/**
 * @author: Adam Lisichin
 * @file: Exports DoctorPatientDetail component - rendered in /dashboard/patients/[id] in doctor's perspective
 */
import {Flex, Text, useColorModeValue, useToast} from "@chakra-ui/react";
import Card from "../../card/Card";
import CardHeader from "../../card/CardHeader";
import CardBody from "../../card/CardBody";
import {FC, useEffect, useState} from "react";
import {ExaminationData} from "../../../api/types";
import {getExaminationByQuery} from "../../../api/examinations";
import PatientExaminationsTable from "../../tables/PatientExaminationsTable";


interface PatientDetailProps {
  patientId: string | number;
}

const DoctorPatientDetail: FC<PatientDetailProps> = ({patientId}) => {
  const textColor = useColorModeValue("gray.700", "white");

  const toast = useToast();

  const [examinations, setExaminations] = useState<ExaminationData[]>([]);

  useEffect(() => {
    getExaminationByQuery(`?patient=${patientId}`).then((res) => {
      const {results} = res.data;
      setExaminations([...results]);
    }).catch(() => {
      toast({
        id: "error-get-examiation",
        description: "Failed to fetch user's examinations!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId]);

  return (
    <Flex direction="column" pt={{base: "120px", md: "75px"}}>
      <Card overflowX={{sm: "scroll", xl: "hidden"}}>
        <CardHeader p="6px 0px 22px 0px" flexDirection={{base: "column", md: "row"}}>
          <Flex alignItems="center" width="80%" grow={1}>
            <Text fontSize="2xl" color={textColor} fontWeight="bold">
              Examinations
            </Text>
          </Flex>
        </CardHeader>

        <CardBody>
          <PatientExaminationsTable examinations={examinations}/>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default DoctorPatientDetail;
