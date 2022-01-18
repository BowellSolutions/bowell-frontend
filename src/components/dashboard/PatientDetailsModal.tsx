/**
 * @author: Adam Lisichin
 * @file: Exports PatientDetailsModal component - on button click fetch data and open modal with patients details
 **/
import {FC, useState} from "react";
import {
  Avatar,
  Box,
  Button,
  chakra,
  Flex,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useColorModeValue,
  useToast
} from "@chakra-ui/react";
import {useDisclosure} from "@chakra-ui/hooks";
import {UserData} from "../../api/types";
import {getUserById} from "../../api/users";
import {formatDate} from "../views/utils/format";

interface PatientDetailsModalProps {
  patientId: number | string;
}


const PatientDetailsModal: FC<PatientDetailsModalProps> = ({patientId}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const nameColor = useColorModeValue("gray.800", "white");

  const toast = useToast();

  const [details, setDetails] = useState<UserData | null>(null);

  const handleOpen = () => {
    getUserById(patientId).then((res) => {
      setDetails(res.data);
      onOpen();
    }).catch(() => {
      toast({
        id: "error-view-patient",
        description: "Failed to fetch patient details!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });
  };

  return (
    <>
      <Button p="0px" bg="transparent" variant="no-hover" onClick={handleOpen}>
        <Text
          fontSize="md"
          color="gray.400"
          fontWeight="bold"
          cursor="pointer"
        >
          View
        </Text>
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay/>
        <ModalContent>
          <ModalCloseButton/>

          {details != null && (
            <Flex
              flexDirection="column"
              alignSelf="center"
              justifySelf="center"
              maxH="calc(100vh - 10px)"
              overflowY="scroll"
              id="patient-details"
            >
              <Flex
                direction="column"
                w={{base: "445px",}}
                minH="50vh"
                borderRadius="15px"
                p={{base: "28px 32px", md: "40px"}}
                boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
              >
                <Flex justifyContent="center" alignItems="center" pb={{base: "8px", md: "16px"}}>
                  <Avatar src="" w="64px" h="64px"/>
                </Flex>

                <Box px={8}>
                  <chakra.h1
                    fontSize="2xl"
                    fontWeight="bold"
                    textAlign="center"
                    color={nameColor}
                    mb="16px"
                  >
                    {details.first_name} {details.last_name}
                  </chakra.h1>

                  <Flex direction="row" alignItems="center" mb="16px">
                    <Text color="gray.500" fontSize="md" fontWeight="semibold" mr={"8px"} w={"25%"}>
                      ID:{" "}
                    </Text>
                    <Input readOnly value={details.id}/>
                  </Flex>

                  <Flex direction="row" alignItems="center" mb="16px">
                    <Text color="gray.500" fontSize="md" fontWeight="semibold" mr={"8px"} w={"25%"}>
                      Type:{" "}
                    </Text>
                    <Input readOnly value={details.type}/>
                  </Flex>

                  <Flex direction="row" alignItems="center" mb="16px">
                    <Text color="gray.500" fontSize="md" fontWeight="semibold" mr={"8px"} w={"25%"}>
                      Email:{" "}
                    </Text>
                    <Input readOnly value={details.email}/>
                  </Flex>

                  <Flex direction="row" alignItems="center" mb="16px">
                    <Text color="gray.500" fontSize="md" fontWeight="semibold" mr={"8px"} w={"25%"}>
                      Join Date:{" "}
                    </Text>
                    <Input readOnly value={formatDate(details.date_joined)}/>
                  </Flex>

                  <Flex direction="row" alignItems="center" mb="16px">
                    <Text color="gray.500" fontSize="md" fontWeight="semibold" mr={"8px"} w={"25%"}>
                      Birth Date:{" "}
                    </Text>
                    <Input readOnly value={String(details.birth_date) ?? details.birth_date}/>
                  </Flex>
                </Box>
              </Flex>
            </Flex>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PatientDetailsModal;
