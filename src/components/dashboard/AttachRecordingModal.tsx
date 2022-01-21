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
 * @file: Exports AttachRecordingModal component - modal activated on button click with recording update form
 **/
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
