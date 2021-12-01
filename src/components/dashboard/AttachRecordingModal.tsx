import {FC} from "react";
import {useDisclosure} from "@chakra-ui/hooks";
import {Button, Flex, Text} from "@chakra-ui/react";
import {Modal, ModalCloseButton, ModalContent, ModalOverlay} from "@chakra-ui/modal";
import AttachRecordingForm from "./AttachRecordingForm";

interface AttachRecordingModalProps {
  recordingId: number,
}

const AttachRecordingModal: FC<AttachRecordingModalProps> = ({recordingId}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <>
      <Button
        p="0px"
        bg="transparent"
        mb={{sm: "10px", md: "0px"}}
        me={{md: "12px"}}
        onClick={() => onOpen()}
      >
        <Flex color="green.500" cursor="pointer" align="center" p="12px">
          <Text fontSize="sm" fontWeight="semibold">
            ATTACH
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

          <AttachRecordingForm
            recordingId={recordingId}
            onClose={onClose}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default AttachRecordingModal;
