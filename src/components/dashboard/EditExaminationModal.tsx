import {FC} from "react";
import {Button, Flex, Icon, Text, useColorModeValue} from "@chakra-ui/react";
import {Modal, ModalCloseButton, ModalContent, ModalOverlay} from "@chakra-ui/modal";
import {FaPencilAlt} from "react-icons/fa";
import {useDisclosure} from "@chakra-ui/hooks";
import EditExaminationForm from "./EditExaminationForm";

interface EditExaminationModalProps {
  examinationId: number,
}


const EditExaminationModal: FC<EditExaminationModalProps> = ({examinationId}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <>
      <Button p="0px" bg="transparent" onClick={() => onOpen()}>
        <Flex color={textColor} cursor="pointer" align="center" p="12px">
          <Icon as={FaPencilAlt} me="4px"/>
          <Text fontSize="sm" fontWeight="semibold">
            Edit
          </Text>
        </Flex>
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay/>
        <ModalContent>
          <ModalCloseButton/>

          <EditExaminationForm
            examinationId={examinationId}
            onClose={onClose}
          />
        </ModalContent>
      </Modal>

    </>
  );
};

export default EditExaminationModal;
