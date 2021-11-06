import {FC, useCallback, useState} from "react";
import {Box, Button, Flex, Heading, IconButton, Progress, Text, useColorModeValue} from "@chakra-ui/react";
import {uploadFile} from "../../api/files";
import {useDropzone} from "react-dropzone";
import {DeleteIcon} from "@chakra-ui/icons";

const MAX_SIZE = 1024 * 1024;

interface AcceptedFile extends File {
  path: string,
}

export const FileUpload: FC = () => {
  const [selectedFile, setSelectedFile] = useState<AcceptedFile | null>(null);
  const [percentage, setPercentage] = useState<number>(0);
  const [error, setError] = useState<any>(null);

  const dropzoneBgColorActive = useColorModeValue("#f7fafc", "");
  const dropzoneBgColorAccept = useColorModeValue("#eff2f7", "");

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
    if (selectedFile) {
      const data = new FormData();
      data.append('file', selectedFile);
      uploadFile(data, onUploadProgress).then(
        res => console.log(res)
      ).catch(err => setError(JSON.stringify(err)));
    }
  };

  const onDrop = useCallback((acceptedFiles, fileRejections, event) => {
    setSelectedFile(acceptedFiles[0]);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop: onDrop, multiple: false, maxSize: MAX_SIZE,
  });

  const getBorderColor = () => {
    if (isDragAccept) return '#81e6d9'; // teal-200
    else if (isDragActive) return '#90cdf4'; // blue-200
    else if (isDragReject) return '#e53e3e'; // red-500
    return '#e2e8f0'; // gray-200
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

      {selectedFile && (
        <Flex
          flexDirection="row"
          alignItems="center"
        >
          <Text as="p" p={2}>
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

      {percentage > 0 && selectedFile && (
        <Progress value={percentage} colorScheme={error ? "red" : "blue"}/>
      )}

      <Button
        colorScheme="teal"
        display={selectedFile ? "block" : "none"}
        onClick={handleFileUpload}
      >
        {error ? "Retry" : "Submit"}
      </Button>
    </Box>
  );
};

export default FileUpload;
