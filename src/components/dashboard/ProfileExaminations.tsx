/**
* @author: Adam Lisichin
* @file: Exports ProfileExaminations component used in doctor's Profile
*/
import {ExaminationData} from "../../api/types";
import {FC} from "react";
import {Button, Flex, Text, useColorModeValue} from "@chakra-ui/react";
import NextLink from "next/link";

interface ProfileExaminationsProps {
  examinations: ExaminationData[],
}

const ProfileExaminations: FC<ProfileExaminationsProps> = ({examinations}) => {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");

  return (
    <>
      {examinations.length && examinations.map((examination, idx) => (
        <Flex
          justifyContent="space-between" mb="21px"
          shadow="sm" p={{sm: "4px", md: "8px"}} borderRadius="16px"
          border="1px solid"
          borderColor={borderColor}
          bgColor={bgColor}
          key={`examinations-container-${idx}`}
          _hover={{shadow: 'md', transition: "box-shadow 0.3s"}}
          cursor="default"
        >
          <Flex align="center">
            <Flex direction="column">
              <Text fontSize="sm" color={textColor} fontWeight="bold" textTransform="none">
                Examination #{examination.id}
              </Text>

              <Text fontSize="sm" color="gray.500" fontWeight="semibold" textTransform="none">
                Patient:{" "}
                <Text as="span" color="gray.500" fontWeight="semibold">
                  {examination?.patient?.first_name} {examination?.patient?.last_name}
                </Text>
              </Text>

              <Text fontSize="sm" color="gray.500" fontWeight="semibold" textTransform="none">
                Status:{" "}
                <Text as="span" color="gray.500">{examination.status}</Text>
              </Text>
            </Flex>
          </Flex>

          <NextLink passHref href={`/dashboard/examinations/${encodeURIComponent(examination.id)}`}>
            <Button pr="4px" bg="transparent" variant="no-hover">
              <Text
                fontSize="sm"
                fontWeight="600"
                color="teal.300"
                alignSelf="center"
              >
                VIEW
              </Text>
            </Button>
          </NextLink>
        </Flex>
      ))}
    </>
  );
};

export default ProfileExaminations;
