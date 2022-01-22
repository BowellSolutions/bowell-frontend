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
 * @file: Exports FeatureSection component used on home page
 **/
import {Box, chakra, Flex, Icon, SimpleGrid, useColorModeValue} from "@chakra-ui/react";
import {FcStatistics} from "react-icons/fc";
import {FiEdit, FiUpload} from "react-icons/fi";
import {MdOutlineNotifications, MdPlaylistAdd, MdOutlineAttachFile} from "react-icons/md";
import {IoMdAnalytics} from "react-icons/io";
import {BiReceipt, BiDetail} from "react-icons/bi";
import {BsFillPersonFill, BsFillVolumeUpFill} from "react-icons/bs";
import {HiLockClosed} from "react-icons/hi";
import {FC, ReactNode} from "react";

interface FeatureProps {
  color: string,
  title: string,
  icon: JSX.Element,
  children: ReactNode,
}

const Feature: FC<FeatureProps> = ({color, icon, title, children}) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const iconBgColor = useColorModeValue(`${color}.100`, `${color}.600`);
  const textColor = useColorModeValue(`${color}.600`, `${color}.100`);
  const descColor = useColorModeValue("gray.500", "gray.400");
  const titleColor = useColorModeValue("gray.900", "inherit");

  return (
    <Box
      p={{base: 2, lg: 4}}
      bg={bgColor}
      shadow="lg"
      rounded="lg"
      _hover={{shadow: "xl", cursor: "default",}}
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        w={8}
        h={8}
        mb={4}
        rounded="full"
        color={textColor}
        bg={iconBgColor}
      >
        <Icon
          boxSize={5}
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
        >
          {icon}
        </Icon>
      </Flex>
      <chakra.h3
        mb={2}
        fontWeight="semibold"
        lineHeight="shorter"
        color={titleColor}
      >
        {title}
      </chakra.h3>
      <chakra.p
        fontSize="sm"
        color={descColor}
        textTransform="none"
      >
        {children}
      </chakra.p>
    </Box>
  );
};

export default function FeaturesSection() {
  const bgColor = useColorModeValue("", "gray.700");
  const titleColor = useColorModeValue("gray.900", "inherit");
  const subtitleColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Flex
      p={{base: 2, sm: 2, md: 2}}
      px={{lg: 16}}
      py={{lg: 8}}
      w="auto"
      bg={bgColor}
      justifyContent="center"
      alignItems="center"
      id="features-section"
    >
      <Box px={{base: 0, sm: 8}} py={8} mx="auto">
        <Box textAlign={{lg: "center"}}>
          <chakra.p
            mt={2}
            fontSize={{base: "3xl", sm: "4xl"}}
            lineHeight="8"
            fontWeight="extrabold"
            letterSpacing="tight"
            color={titleColor}
          >
            Features
          </chakra.p>

          <chakra.p
            mt={4}
            maxW="2xl"
            fontSize="xl"
            mx={{lg: "auto"}}
            color={subtitleColor}
          >
            {"Bowell Dashboard has been implemented in cooperation with doctors and patients."}
          </chakra.p>
        </Box>

        <SimpleGrid
          columns={{base: 1, sm: 2, md: 3, lg: 4}}
          spacingX={{base: 4, sm: 8, md: 16, lg: 24}}
          spacingY={{base: 4, sm: 10, lg: 20}}
          mt={6}
        >
          <Feature
            color="red"
            title="Doctor Statistics"
            icon={<Icon as={FcStatistics}/>}
          >
            Doctors can see how many assigned patients they have,
            how many examinations are there in total, on the way and coming in next week.
          </Feature>

          <Feature
            color="pink"
            title="Examinations"
            icon={<Icon as={BiReceipt}/>}
          >
            {"List of specific examinations available to doctors and patients."}
          </Feature>

          <Feature
            color="yellow"
            title="Create new examination"
            icon={<Icon as={MdPlaylistAdd}/>}
          >
            {"Choose a date and patient to plan an appoinment and create examination."}
          </Feature>

          <Feature
            color="green"
            title="Examination details"
            icon={<Icon as={BiDetail}/>}
          >
            {"Details such as patient's height, mass, symptoms, medication, overview and examination status."}
          </Feature>
          <Feature
            color="gray"
            title="Edit examination"
            icon={<Icon as={FiEdit}/>}
          >
            {"Doctors can edit examination details."}
          </Feature>
          <Feature
            color="blue"
            title="File upload"
            icon={<Icon as={FiUpload}/>}
          >
            {"Doctors can upload recordings in wav format."}
          </Feature>
          <Feature
            color="teal"
            title="Recordings management"
            icon={<Icon as={BsFillVolumeUpFill}/>}
          >
            {"Doctors can manage recordings and view their details."}
          </Feature>

          <Feature
            color="purple"
            title="Attach and detach recordings"
            icon={<Icon as={MdOutlineAttachFile}/>}
          >
            {"Recordings can be attached to an existing examination or detached from it."}
          </Feature>

          <Feature
            color="blue"
            title="Start recording analysis"
            icon={<Icon as={IoMdAnalytics}/>}
          >
            {"Doctors can start an asynchronous analysis of an uploaded recording."}
          </Feature>

          <Feature
            color="green"
            title="Real time notifications"
            icon={<Icon as={MdOutlineNotifications}/>}
          >
            {"Users receive real time notifications with data about analysis."}
          </Feature>

          <Feature
            color="cyan"
            title="User accounts"
            icon={<Icon as={BsFillPersonFill}/>}
          >
            {"Users can create a new account and then access the dashboard by logging in."}
          </Feature>

          <Feature
            color="red"
            title="Secure authentication"
            icon={<Icon as={HiLockClosed}/>}
          >
            {"Protected routes prevent unauthorized users from accessing."}
          </Feature>
        </SimpleGrid>
      </Box>
    </Flex>
  );
}
