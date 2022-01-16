/**
* @author: Adam Lisichin
* @file: Exports ExaminationDetailInfo component used in ExaminationDetail
*/
import {FC} from "react";
import CardHeader from "../card/CardHeader";
import {Divider, Flex, FlexProps, Text} from "@chakra-ui/react";
import CardBody from "../card/CardBody";
import {formatDate} from "../views/utils/format";
import Card from "../card/Card";
import {ExaminationData} from "../../api/types";

interface ExaminationDetailInfoProps extends FlexProps {
  examination: ExaminationData,
  modal?: FC<{ examination: ExaminationData }> // modal passed as children to reuse this component
}

const ExaminationDetailInfo: FC<ExaminationDetailInfoProps> = ({examination, modal: Modal, ...flexProps}) => {
  return (
    <Card m={{base: "0 0 8px 0", md: "0 8px 8px 8px"}} {...flexProps}>
      <CardHeader>
        <Text fontSize="lg" fontWeight="bold" mb="10px" userSelect="none">
          Examination #{examination.id}
        </Text>

        <Flex grow={1}/>

        {Modal != null && <Modal examination={examination}/>}
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
  );
};

export default ExaminationDetailInfo;
