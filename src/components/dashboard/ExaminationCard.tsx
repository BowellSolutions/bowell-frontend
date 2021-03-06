/**
 * @license MIT
 * Copyright (c) 2022 Adam Lisichin, Gustaw Daczkowski, Hubert Decyusz, Wojciech Nowicki
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE
 *
 * @author: Adam Lisichin
 * @file: Exports ExaminationCard component used in PatientDashboard
 */
import {FC} from "react";
import {Flex, FlexProps, Link, Text, Textarea, useColorModeValue} from "@chakra-ui/react";
import NextLink from "next/link";
import {formatDate} from "../views/utils/format";
import {ExaminationData} from "../../api/types";

interface ExaminationsCardProps extends FlexProps {
  examination: ExaminationData,
  verbose?: boolean,
}

/*
* Component which displays examination details inside the card.
* There is an option to display more descriptive details (height, mass, symptoms, medication, overview).
* Similar to ExaminationTableRow but used by Patient.
*/
const ExaminationCard: FC<ExaminationsCardProps> = ({examination, verbose = false, ...flexProps}) => {
  const nameColor = useColorModeValue("gray.500", "white");
  const bgColor = useColorModeValue("#f8f9fa", "gray.800");
  const focusColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Flex
      px="24px" py="12px" bg={bgColor} my="0" mx="8px"
      borderRadius="12px" w="100%" direction={{base: "column", xl: "row"}}
      {...flexProps}
    >
      <Flex justify="space-between" w={{base: "unset", xl: "80%"}}>
        <Flex direction="column">
          <NextLink href={`/dashboard/examinations/${examination.id}`}>
            <Link>
              <Text
                color={nameColor} fontSize="md" fontWeight="bold" mb="10px" userSelect="none"
                _hover={{textDecoration: "underline", cursor: "pointer"}}
              >
                {examination?.patient?.first_name} {examination?.patient?.last_name}
              </Text>
            </Link>
          </NextLink>

          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Examination ID:{" "}
            <Text as="span" color="gray.500">{examination.id}</Text>
          </Text>

          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Doctor:{" "}
            <Text as="span" color="gray.500">
              {examination?.doctor?.first_name}{" "}{examination?.doctor?.last_name}
            </Text>
          </Text>

          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Appointment Date:{" "}
            <Text as="span" color="gray.500">{formatDate(examination.date)}</Text>
          </Text>

          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Status:{" "}
            <Text as="span" color="gray.500">{examination.status}</Text>
          </Text>

          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Recording:{" "}
            {examination.recording != null ? (
              <Text as="span" color="green.500">{examination.recording.name}</Text>
            ) : (
              <Text as="span" color="red.500">None</Text>
            )}
          </Text>

          {verbose && (
            <>
              <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                Height [cm]:{" "}
                <Text as="span" color="gray.500">{examination.height_cm}</Text>
              </Text>

              <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                Mass [kg]:{" "}
                <Text as="span" color="gray.500">{examination.mass_kg}</Text>
              </Text>
            </>
          )}
        </Flex>
      </Flex>

      {/* Optional box with overview */}
      {verbose && (
        <Flex justify="space-between" w="100%" grow={1}>
          <Flex direction="column" pt="32px" grow={1}>
            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              Symptoms:{" "}
              <Text as="span" color="gray.500">{examination.symptoms}</Text>
            </Text>

            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              Medication:{" "}
              <Text as="span" color="gray.500">{examination.medication}</Text>
            </Text>

            <Text color={nameColor} fontSize="sm" fontWeight="bold" pb="0.25rem">
              Overview:
            </Text>

            <Textarea
              p="8px"
              mb="2px"
              resize="none"
              focusBorderColor={focusColor}
              isReadOnly
            >
              {examination.overview}
            </Textarea>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default ExaminationCard;
