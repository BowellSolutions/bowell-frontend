/**
 * @license MIT
 * Copyright (c) 2022 Adam Lisichin, Hubert Decyusz, Wojciech Nowicki, Gustaw Daczkowski
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
 *
 * @author: Adam Lisichin
 * @file: Exports FileUpload component - dropzone with file upload functionality
 **/
import {FC, useCallback, useState} from "react";
import {Box, Button, Flex, IconButton, Progress, Text, useColorModeValue, useToast} from "@chakra-ui/react";
import {uploadFile} from "../../api/files";
import {useDropzone} from "react-dropzone";
import {DeleteIcon} from "@chakra-ui/icons";
import {useDispatch} from "react-redux";
import {retrieveRecordings} from "../../redux/actions/dashboard";

const MAX_SIZE = 1024 * 1024 * 1024;

interface AcceptedFile extends File {
  path: string,
}

interface FileUploadProps {
  examinationId?: number,
}

export const FileUpload: FC<FileUploadProps> = ({examinationId}) => {
  const [selectedFile, setSelectedFile] = useState<AcceptedFile | null>(null);
  const [percentage, setPercentage] = useState<number>(0);
  const [error, setError] = useState<any>(null);

  const dispatch = useDispatch();

  const toast = useToast();

  const dropzoneBgColorActive = useColorModeValue("gray.50", "transparent");
  const dropzoneBgColorAccept = useColorModeValue("gray.100", "gray.600");

  const removeFile = (): void => {
    setError(null);
    setSelectedFile(null);
    setPercentage(0);
  };

  const onUploadProgress = (progressEvent: ProgressEvent): void => {
    const {loaded, total} = progressEvent;
    const percent = Math.floor(loaded * 100 / total);
    setPercentage(percent);
  };

  const handleFileUpload = (): void => {
    setError(null);
    setPercentage(0);
    if (!examinationId) {
      setError({message: "Please select examination id first!"});
    }

    if (selectedFile && examinationId) {
      const data = new FormData();
      data.append('file', selectedFile);
      data.append('name', selectedFile.name);
      data.append('examination', String(examinationId));
      uploadFile(data, onUploadProgress).then(
        res => {
          if (res.status === 201) {
            setPercentage(0);
            setError(null);
            toast({
              id: "success-upload-file",
              description: "Successfully uploaded file!",
              status: "success",
              duration: 2500,
              isClosable: true,
            });
            dispatch(retrieveRecordings(undefined)); // reload recordings - later replace with individual object load
          }
        }
      ).catch(err => {
        setError(JSON.stringify(err));
        toast({
          id: "error-upload-file",
          description: "File upload did not succeed!",
          status: "error",
          duration: 2500,
          isClosable: true,
        });
      });
    }
  };

  const onDrop = useCallback((acceptedFiles, fileRejections, event) => {
    setSelectedFile(acceptedFiles[0]);
    if (fileRejections.length) setError(fileRejections);
    else setError(null);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop: onDrop, multiple: false, maxSize: MAX_SIZE, accept: "audio/wav"
  });

  const getBorderColor = () => {
    if (isDragAccept) return 'teal.200';
    else if (isDragActive) return 'blue.200';
    else if (isDragReject) return 'red.500';
    return 'gray.200';
  };

  return (
    <Box>
      <Flex
        {...getRootProps()}
        flexDirection="column"
        alignItems="center"
        p="40px"
        my="8px"
        borderWidth="2px"
        borderRadius="2px"
        borderStyle="dashed"
        borderColor={getBorderColor()}
        backgroundColor={isDragAccept ? dropzoneBgColorAccept : dropzoneBgColorActive}
        color="#bdbdbd"
        transition="border 0.24s ease-in-out"
        cursor="pointer"
      >
        <input {...getInputProps()}/>
        <Text as="p" userSelect="none">
          Drop your file or click to select and upload
        </Text>
      </Flex>

      {percentage > 0 && selectedFile && (
        <Box py="8px">
          <Progress value={percentage} colorScheme={error ? "red" : "blue"}/>
        </Box>
      )}

      {selectedFile && (
        <Flex
          flexDirection="row"
          alignItems="center"
        >
          <Text as="p" p={2} textTransform="none">
            {selectedFile.path}
          </Text>

          <IconButton
            h="32px"
            w="32px"
            colorScheme="red"
            aria-label="Remove file"
            icon={<DeleteIcon/>}
            onClick={removeFile}
          />
        </Flex>
      )}

      {examinationId != null && (
        <Button
          colorScheme="teal"
          display={selectedFile ? "block" : "none"}
          onClick={handleFileUpload}
        >
          {error ? "Retry" : "Submit"}
        </Button>
      )}
    </Box>
  );
};

export default FileUpload;
