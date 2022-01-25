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
 * @file: Exports ConfirmDetachModal component - modal activated on button click, prompts user to either confirm their
 * action or cancel and then closes itself.
 **/
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
import {retrieveRecordings} from "../../redux/actions/dashboard";
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
      dispatch(retrieveRecordings(undefined));
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
