/**
* @author: Adam Lisichin
* @file: Exports PatientExaminationDetail component which is rendered in Next.js page /dashboard/examinations/[id]
*/
import {Badge, Button, Flex, Link, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue} from "@chakra-ui/react";
import NextLink from "next/link";
import {formatDate} from "../views/utils/format";
import {ExaminationData} from "../../api/types";
import {FC} from "react";

const POSITIVE_STATUSES = ["scheduled", "completed", "file_uploaded", "processing_succeeded"];
const NEGATIVE_STATUSES = ["cancelled", "processing_failed"];

const getStatusColor = (status: string, posColor: string, negColor: string) => {
  if (POSITIVE_STATUSES.some(s => s === status)) return posColor;
  else if (NEGATIVE_STATUSES.some(s => s === status)) return negColor;
  return "gray.100";
};

interface PatientExaminationsTableProps {
  examinations: ExaminationData[],
}

const PatientExaminationsTable: FC<PatientExaminationsTableProps> = ({examinations}) => {
  const textColor = useColorModeValue("gray.700", "white");
  const posColor = useColorModeValue("green.300", "green.700");
  const negColor = useColorModeValue("red.500", "red.600");

  return (
    <Table variant="simple" color={textColor}>
      <Thead>
        <Tr my=".6rem" pl="0px" color="gray.400">
          <Th pl="0px" color="gray.400">Examination ID</Th>
          <Th color="gray.400" pl="0px">Doctor</Th>
          <Th color="gray.400" pl="0px">Date</Th>
          <Th color="gray.400" pl="0px">Status</Th>
          <Th color="gray.400"/>
        </Tr>
      </Thead>

      <Tbody>
        {examinations.length > 0 && examinations.map((examination) => (
          <Tr key={`patient-examination-${examination.id}`}>
            <Td minWidth={{sm: "40px"}} pl="0px">
              <NextLink href={`/dashboard/examinations/${examination.id}`}>
                <Text
                  fontWeight="bold" cursor="pointer"
                  _hover={{textDecoration: "underline"}}
                  display="inline-block"
                >
                  {examination.id}
                </Text>
              </NextLink>
            </Td>

            <Td minWidth={{sm: "250px"}} pl="0px">
              <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    minWidth="100%"
                    textTransform="none"
                    cursor="pointer"
                    _hover={{textDecoration: "underline"}}
                  >
                    Dr. {examination.doctor.first_name} {examination.doctor.last_name}
                  </Text>
                  <Text fontSize="sm" color="gray.400" fontWeight="normal" textTransform="none">
                    <Link href={`mailto:${examination.doctor.email}`} _hover={{textDecoration: "underline"}}>
                      {examination.doctor.email}
                    </Link>
                  </Text>
                </Flex>
              </Flex>
            </Td>

            <Td pl="0px">
              {formatDate(examination.date)}
            </Td>

            <Td pl="0px">
              <Badge
                bg={examination.status ? getStatusColor(examination.status, posColor, negColor) : ""}
                fontSize="16px"
                p="5px 10px"
                borderRadius="8px"
                textTransform="lowercase"
              >
                {examination.status}
              </Badge>
            </Td>

            <Td pl="0px">
              <NextLink href={`/dashboard/examinations/${examination.id}`} passHref>
                <Button fontSize="md" fontWeight="bold">
                  View
                </Button>
              </NextLink>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default PatientExaminationsTable;
