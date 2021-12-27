import {ChangeEvent, FC, useEffect, useState} from "react";
import {Flex, Select, Table, Tbody, Text, Th, Thead, Tr, useColorModeValue} from "@chakra-ui/react";
import CardBody from "../../card/CardBody";
import CardHeader from "../../card/CardHeader";
import Card from "../../card/Card";
import FileUpload from "../../dashboard/FileUpload";
import RecordingsTableRow from "../../tables/RecordingsTableRow";
import {useDispatch} from "react-redux";
import {loadRecordings} from "../../../redux/actions/dashboard";
import {useAppSelector} from "../../../redux/hooks";
import {formatDate} from "../utils/format";


const Recordings: FC = () => {
  const textColor = useColorModeValue("gray.700", "white");

  const dispatch = useDispatch();
  const recordings = useAppSelector(state => state.dashboard.recordings);
  const examinations = useAppSelector(state => state.dashboard.examinations);

  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    dispatch(loadRecordings());
  }, []);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => setSelected(e.target.value);

  return (
    <Flex direction="column" pt={{base: "120px", md: "75px"}}>
      <Card
        overflowX={{sm: "scroll", xl: "hidden"}}
      >
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Uploaded Files
          </Text>
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
              {recordings.length > 0 && recordings.map((file) => {
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
            {examinations.length > 0 && examinations.map((examination) => (
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
