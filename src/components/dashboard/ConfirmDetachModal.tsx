import {FC, useRef} from "react";
import {AlertDialogContent} from "@chakra-ui/modal";
import {useDisclosure} from "@chakra-ui/hooks";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button, Flex, Icon, Text, useToast
} from "@chakra-ui/react";
import {FaTrashAlt} from "react-icons/fa";
import {deleteFile} from "../../api/files";
import {loadRecordings} from "../../redux/actions/dashboard";
import {useAppDispatch} from "../../redux/hooks";


interface ConfirmDetachModalProps {
  recordingId: number | string,
}

const ConfirmDetachModal: FC<ConfirmDetachModalProps> = ({recordingId}) => {
  const dispatch = useAppDispatch();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const cancelRef = useRef(null);
  const toast = useToast();

  const handleDetach = (): void => {
    // detach recording from examination
    deleteFile(recordingId).then(() => {
      dispatch(loadRecordings());
      if (!toast.isActive("success-toast-detach")) {
        toast({
          id: "success-toast-detach",
          description: "Successfully detached from examination!",
          status: "success",
          duration: 2500,
          isClosable: true,
        });
      }
    }).catch(() => {
      if (!toast.isActive("error-toast-detach")) {
        toast({
          id: "error-toast-detach",
          description: "Failed to detach recording from examination!",
          status: "error",
          duration: 2500,
          isClosable: true,
        });
      }
    });
  };

  return (
    <>
      <Button
        p="0px"
        bg="transparent"
        mb={{sm: "10px", md: "0px"}}
        me={{md: "12px"}}
        onClick={onOpen}
      >
        <Flex color="red.500" cursor="pointer" align="center" p="12px">
          <Icon as={FaTrashAlt} me="4px"/>
          <Text fontSize="sm" fontWeight="semibold">
            DETACH
          </Text>
        </Flex>
      </Button>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay/>

        <AlertDialogContent>
          <AlertDialogHeader>Detach Examination?</AlertDialogHeader>

          <AlertDialogCloseButton/>

          <AlertDialogBody>
            Are you sure you want to detach examination from this recording?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>

            <Button colorScheme="red" ml={3} onClick={handleDetach}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ConfirmDetachModal;
