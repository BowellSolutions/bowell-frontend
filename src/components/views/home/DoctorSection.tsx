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
 * @file: Exports DoctorSection component used on home page
 **/
import {FC, useState} from "react";
import {Box, chakra, Flex, useColorModeValue} from "@chakra-ui/react";
import Carousel from "./Carousel";

const slides = [
  {
    img: "/assets/hero_doctor_slide1.jpg",
    heading: "See recent activities.",
    descriptions: [
      'Doctors can see their statistics related to the count of patients and examinations. ' +
      'Apart from that, there are boxes with recently added patients, processed recordings and ' +
      'upcoming examinations. Clicking on certain elements inside the cards, will redirect to a proper detail page.',

      'More items are available in subpages such as patients, examinations, recordings. In dashboard\'s main view ' +
      'there are only a few of them.',
    ],
  },
  {
    img: "/assets/hero_doctor_slide2.jpg",
    heading: "Manage your patients.",
    descriptions: [
      'Doctors can view all of the patients visible in our system. Those patients can be assigned to examinations. ' +
      'Patients can be filtered with a query provided in search field.',

      'Clicking the show button, patiend id or avatar causes a redirect to patient detail page with all of ' +
      'their examinations under the doctor who is viewing them. ' +
      'View button displays more detials about the chosen person.'
    ]
  },
  {
    img: "/assets/hero_doctor_slide3.jpg",
    heading: "View appointments and examinations.",
    descriptions: [
      'Doctors can see all of the examinations they created and edit them. Uploading or removing a recording is ' +
      'possible after expanding the card with an arrow button. Examinations can be filtered by the content of ' +
      'the search field. To create a new examination click the New Appointment button and then choose a ' +
      'patient and a date',

      'To see more details click on patient\'s name and get redirected to examination detail page.'
    ]
  },
  {
    img: "/assets/hero_doctor_slide4.jpg",
    heading: "Activate recording analysis.",
    descriptions: [
      'Doctor can activate recording analysis in examination detail page by clicking the analyze button. ' +
      'They will be notified about the start of the inference and after the analysis data will be ' +
      'automatically updated by our live service module. There will be a card with all of the attributes returned by ' +
      'the model and a probability in time graph.',

      'Line chart is customizable and dynamically adjusts itself to settings changes. ' +
      'Doctor can change a X-axis time step, line colors, enable dots. ' +
      'Graph can be saved to PNG at any time.'
    ]
  },
  {
    img: "/assets/hero_doctor_slide5.jpg",
    heading: "Upload new recordings.",
    descriptions: [
      'Doctor can manage their recordings, upload new ones, attach or detach an examination, view more details by ' +
      'expanding a row. After clicking on examination id, user is redirected to the page with examination details.',
      'Recordings can either be uploaded by clicking or dropping files into dropzone below the recordings table ' +
      'or uploaded directly in one of the examination cards in examinations page. Upload will not succeed if a ' +
      'chosen examination already has an recording or the file is too large.',
    ]
  },
];


const DoctorSection: FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const headingColor = useColorModeValue("gray.700", "white");
  const textColor = useColorModeValue("gray.400", "gray.300");
  const lighterDarkBg = useColorModeValue("", "gray.700");

  return (
    <Flex
      direction={{base: "column", xl: "row"}}
      bg={lighterDarkBg}
      px={{base: 2, sm: 8, md: 12, lg: 16}}
      pt={{base: 4, sm: 8}}
      pb={{base: 2, sm: 16}}
      mx="auto"
      id="doctor-section"
    >
      <Flex
        w={{base: "full", md: 11 / 12, xl: 9 / 12}}
        mx="auto"
        pr={{md: 20}}
        color="black"
        alignItems="center"
        order={{base: 2, sm: 2, md: 1}}
      >
        <Box>
          <chakra.h2
            fontSize={{base: "3xl", sm: "4xl"}}
            fontWeight="extrabold"
            lineHeight="shorter"
            color={headingColor}
            mb={6}
          >
            <chakra.span display="block">{"Doctor's View"}</chakra.span>
            <chakra.span
              display="block"
              color="teal.500"
            >
              {slides[currentSlide].heading}
            </chakra.span>
          </chakra.h2>

          {slides[currentSlide].descriptions.map((description, idx) => (
            <chakra.p
              mb={6}
              fontSize={{base: "lg", md: "xl"}}
              color={textColor}
              key={`slide-${currentSlide}-desc-${idx}`}
              textTransform="none"
            >
              {description}
            </chakra.p>
          ))}
        </Box>
      </Flex>

      <Flex order={{base: 1, sm: 1, md: 2}} w="full" pb={{base: 8, lg: 0}}>
        <Carousel slides={slides} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide}/>
      </Flex>
    </Flex>
  );
};

export default DoctorSection;
