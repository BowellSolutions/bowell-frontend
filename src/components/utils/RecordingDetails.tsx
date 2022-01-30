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
