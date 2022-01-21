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
 * @file: Exports ExaminationModal component - modal activated on button click with an examination update form inside
 **/
import {FC} from "react";
import {Button, Flex, Icon, Text, useColorModeValue} from "@chakra-ui/react";
import {Modal, ModalCloseButton, ModalContent, ModalOverlay} from "@chakra-ui/modal";
import {FaPencilAlt} from "react-icons/fa";
import {useDisclosure} from "@chakra-ui/hooks";
import EditExaminationForm from "./EditExaminationForm";
import {ExaminationData} from "../../api/types";

interface EditExaminationModalProps {
  examination: ExaminationData,
}


const EditExaminationModal: FC<EditExaminationModalProps> = ({examination}) => {
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
            examination={examination}
            onClose={onClose}
          />
        </ModalContent>
      </Modal>

    </>
  );
};

export default EditExaminationModal;
