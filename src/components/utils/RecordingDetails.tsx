/*
* @author: Adam Lisichin
* @file: Exports RecordingDetails component which renders recording details row by row
*/
import {FC} from "react";
import {Text} from "@chakra-ui/react";
import {formatDate} from "../views/utils/format";
import {FileData} from "../../api/types";

interface RecordingDetailsProps {
  recordingData: FileData,
  excludeFields?: string[],
}

const EXCLUDED_FIELDS = ["id", "uploaded_at", "uploader", "probability_plot"];

const RecordingDetails: FC<RecordingDetailsProps> = ({recordingData, excludeFields}) => {
  const excluded = excludeFields != null ? [...EXCLUDED_FIELDS, ...excludeFields] : EXCLUDED_FIELDS;

  return (
    <>
      {Object.entries(recordingData).map(
        ([key, value], idx) => {
          // data already present in the table
          if (excluded.some(k => k === key)) return null;
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
    </>
  );
};

export default RecordingDetails;
