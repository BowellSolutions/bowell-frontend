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
 * @file: Exports ProfilePatients component used in doctor's Profile
 */
import {UserData} from "../../api/types";
import {FC} from "react";
import {Avatar, Button, Flex, Link, Text, useColorModeValue} from "@chakra-ui/react";
import NextLink from "next/link";

interface ProfilePatientsProps {
  patients: UserData[],
}

const ProfilePatients: FC<ProfilePatientsProps> = ({patients}) => {
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");

  return (
    <>
      {patients && patients.map((patient, idx) => (
        <Flex
          justifyContent="space-between" mb="21px"
          key={`profile-patient-container-${idx}`}
          bg={bgColor}
          px="8px" py="8px"
          borderRadius="15px"
          w="100%"
          cursor="default"
          _hover={{shadow: 'md', transition: "box-shadow 0.3s"}}
        >
          <Flex align="center">
            <Avatar
              src=""
              w="50px"
              h="50px"
              borderRadius="15px"
              me="10px"
            />
            <Flex direction="column">
              <Text fontSize="sm" color={textColor} fontWeight="bold" textTransform="none">
                {patient?.first_name}{" "}{patient?.last_name}
              </Text>
              <Text fontSize="xs" color="gray.500" fontWeight="400" textTransform="none">
                {patient?.email}
              </Text>
            </Flex>
          </Flex>

          <NextLink href={`/dashboard/patients/${patient.id}`} passHref>
            <Link>
              <Button bg="transparent" variant="no-hover">
                <Text
                  fontSize="sm"
                  fontWeight="600"
                  color="teal.300"
                  alignSelf="center"
                >
                  VIEW
                </Text>
              </Button>
            </Link>
          </NextLink>
        </Flex>
      ))}
    </>
  );
};

export default ProfilePatients;
