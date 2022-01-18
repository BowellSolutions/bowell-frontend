/**
* @author: Adam Lisichin
* @file: Exports RecordingDetails component
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

/**
 * Recording fields rendered row by row, excluding chosen fields (id, uploader, etc.).
 * Each entry is mapped to formatted Text component.
 */
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
