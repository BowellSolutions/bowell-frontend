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
 * @file: Exports RecentRecordings component - recently processed recordings in doctor's dashboard
 **/
import {FC} from "react";
import {Box, Flex, Link, SimpleGrid, Text, useColorModeValue} from "@chakra-ui/react";
import {useAppSelector} from "../../redux/hooks";
import {FileData} from "../../api/types";
import NextLink from "next/link";

/*
  Checks if recording is assigned to any examination,
  and whether its status is processing_failed or processing_succeeded
*/
const condition = (rec: FileData) => {
  return rec.examination != null && (
    rec.examination.status === "processing_failed" || rec.examination.status === "processing_succeeded"
  );
};


const RecentRecordings: FC = () => {
  const recordings = useAppSelector(state => state.dashboard.recordings);

  const bgColor = useColorModeValue("#F8F9FA", "gray.800");
  const nameColor = useColorModeValue("gray.500", "white");

  return (
    <SimpleGrid columns={{sm: 1, md: 2, lg: 1, xl: 2}} spacing={{sm: "8px", md: "12px", lg: "16px"}}>
      {recordings.length > 0 && recordings.filter(condition).map((recording) => (
        <Box
          px="16px" py="12px"
          bg={bgColor} borderRadius="12px" w="100%"
          key={`recent-patient-${recording.id}`}
          cursor="default"
          _hover={{shadow: 'md', transition: "box-shadow 0.3s"}}
        >
          <Flex justify="space-between" w="100%">
            <Flex direction="column" maxWidth="100%">
              <NextLink href={`/dashboard/recordings/${encodeURIComponent(recording.id)}`}>
                <Link>
                  <Text
                    color={nameColor} fontSize="md" fontWeight="bold" mb="10px"
                    _hover={{textDecoration: "underline", cursor: "pointer"}}
                  >
                    {recording.name}
                  </Text>
                </Link>
              </NextLink>

              <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                Examination ID:{" "}
                <Text as="span" color="gray.500">{recording?.examination?.id}</Text>
              </Text>

              <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                Status:{" "}
                <Text as="span" color="gray.500">{recording?.examination?.status}</Text>
              </Text>
            </Flex>
          </Flex>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default RecentRecordings;
