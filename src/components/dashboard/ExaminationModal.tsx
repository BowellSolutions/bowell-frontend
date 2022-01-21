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
 * @file: Exports ExaminationModal component - modal with an examination creation form
 **/
import {FC} from "react";
import ExaminationForm from "./ExaminationForm";
import {useDisclosure} from "@chakra-ui/hooks";
import {Modal, ModalCloseButton, ModalContent, ModalOverlay} from "@chakra-ui/modal";
import {Button, Flex, Icon} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";

interface ExaminationModalProps {
}

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
