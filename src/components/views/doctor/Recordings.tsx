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
 * @file: Exports Recording component rendered in Doctor's dashboard in /dashboard/recordings
 **/
import {ChangeEvent, FC, useEffect, useState} from "react";
import {Flex, Select, Table, Tbody, Text, Th, Thead, Tr, useColorModeValue} from "@chakra-ui/react";
import CardBody from "../../card/CardBody";
import CardHeader from "../../card/CardHeader";
import Card from "../../card/Card";
import FileUpload from "../../dashboard/FileUpload";
import RecordingsTableRow from "../../tables/RecordingsTableRow";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {formatDate} from "../utils/format";
import {retrieveRecordings} from "../../../redux/actions/dashboard";
import SearchInput from "../../utils/SearchInput";
import useTableFilter from "../../../hooks/useTableFilter";


const Recordings: FC = () => {
  const textColor = useColorModeValue("gray.700", "white");

  const dispatch = useAppDispatch();
  const recordings = useAppSelector(state => state.dashboard.recordings);
  const examinations = useAppSelector(state => state.dashboard.examinations);

  const [selected, setSelected] = useState<string>("");

  const [query, setQuery] = useState<string>("");
  const filteredRecordings = useTableFilter(
    recordings,
    ["id", "name"],
    query
  );

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => setSelected(e.target.value);

  useEffect(() => {
    dispatch(retrieveRecordings(undefined));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex direction="column" pt={{base: "120px", md: "75px"}}>
      <Card
        overflowX={{sm: "scroll", xl: "hidden"}}
      >
        <CardHeader p="6px 0px 22px 0px">
          <Flex grow={1}>
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              Uploaded Files
            </Text>
          </Flex>

          <SearchInput
            query={query}
            setQuery={setQuery}
            inputId="recordings-search-field"
            ml={{base: "12px", md: 0}}
          />
        </CardHeader>

        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                <Th color="gray.400" pl="0px">File ID</Th>
                <Th color="gray.400">Filename</Th>
                <Th color="gray.400">Uploaded At</Th>
                <Th color="gray.400">Examination</Th>
                <Th/>
                <Th/>
              </Tr>
            </Thead>

            <Tbody>
              {filteredRecordings.length > 0 && filteredRecordings.map((file) => {
                return (
                  <RecordingsTableRow
                    fileId={file.id}
                    name={file.name}
                    date={String(file.uploaded_at)}
                    examination={file.examination}
                    key={file.name + file.uploaded_at}
                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      <Card my="24px">
        <CardHeader mb="16px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Upload New File
          </Text>
        </CardHeader>

        <CardBody flexDirection="column" px="8px">
          <Text fontSize="md" color={textColor}>
            Select Examination
          </Text>

          <Select my="8px" placeholder="Choose an existing examination" onChange={handleChange}>
            {/* Display examinations which do not have an assigned recording */}
            {examinations.length > 0 && examinations.filter(ex => ex.recording == null).map((examination) => (
              <option key={`option-exam-${examination.id}`} value={examination.id}>
                Examination (#{examination.id}) --
                {examination?.patient?.first_name} {examination?.patient?.last_name} (id. {examination?.patient?.id}) --
                DATE: {formatDate(examination.date)} --
                STATUS: {examination.status}
              </option>
            ))}
          </Select>

          <Text fontSize="md" color={textColor} ml="8px">
            Upload File
          </Text>

          <FileUpload examinationId={selected ? Number(selected) : undefined}/>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Recordings;
