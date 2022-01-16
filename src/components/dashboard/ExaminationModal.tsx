/**
 * @author: Adam Lisichin
 * @file: Exports ExaminationModal component - modal with an examination creation form
 **/
import {FC} from "react";
import ExaminationForm from "./ExaminationForm";
import {useDisclosure} from "@chakra-ui/hooks";
import {Modal, ModalCloseButton, ModalContent, ModalOverlay} from "@chakra-ui/modal";
import {Button, Flex, Icon} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";

interface ExaminationModalProps {}

const ExaminationModal: FC<ExaminationModalProps> = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <>
      <Flex justify="center">
        <Button
          size="md"
          leftIcon={<Icon as={AddIcon}/>}
          bgColor="teal.300"
          onClick={onOpen}
        >
          New Appointment
        </Button>
      </Flex>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay/>
        <ModalContent>
          <ModalCloseButton/>

          <ExaminationForm
            onClose={onClose}
          />
        </ModalContent>
      </Modal>

    </>
  );
};

export default ExaminationModal;
