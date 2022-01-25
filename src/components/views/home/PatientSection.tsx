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
 * @file: Exports PatientSection component used on home page
 **/
import React, {FC, useState} from "react";
import {Box, chakra, Flex, useColorModeValue} from "@chakra-ui/react";
import Carousel from "./Carousel";

const slides = [
  {
    img: "/assets/hero_patient_slide1.jpg",
    heading: "See your recent activities.",
    descriptions: [
      'Inside the dashboard patients can see their recently scheduled and completed examinations. ' +
      'Examinations with analyzed recording have a more descriptive representation for the convenience of our users.',

      'To see more examinations, navigate to examinations page.'
    ],
  },
  {
    img: "/assets/hero_patient_slide2.jpg",
    heading: "Look at your examinations",
    descriptions: [
      'Patients can see a table with all of the examinations they were assigned to. More details are available ' +
      'after moving to detail page e.g with a View button.',
    ]
  },
  {
    img: "/assets/hero_patient_slide3.jpg",
    heading: "View examination details",
    descriptions: [
      'Data such as an appointment date, examination status, patient\'s personal data, height and mass, ' +
      'and also fields filled by a doctor including symptoms, medication and descriptive diagnosis. is ' +
      'available on this page',

      'The stepper at the top indicates the progress of a whole examination process.'
    ]
  },
  {
    img: "/assets/hero_patient_slide4.jpg",
    heading: "Inspect analysis' results",
    descriptions: [
      'Patient can check the results of an analysis if the examination is during or after file analysis ' +
      'by clicking the results backend. Then they are presented with the same recording details as a doctor.',

      'If the examination has not been attached to any recording or the process has not started yet, ' +
      'user will see just the examination details.',
    ]
  },
];


const PatientSection: FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const headingColor = useColorModeValue("gray.700", "white");
  const textColor = useColorModeValue("gray.400", "gray.300");
  const lighterDarkBg = useColorModeValue("", "gray.700");

  return (
    <Flex
      direction={{base: "column", xl: "row"}}
      bg={lighterDarkBg}
      px={{base: 2, sm: 8, md: 12, lg: 16}}
      pt={{base: 0, md: 8}}
      pb={{sm: 4, md: 16}}
      mx="auto"
      id="patient-section"
    >
      <Flex order={1} w="full" >
        <Carousel slides={slides} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide}/>
      </Flex>

      <Flex
        w={{base: "full", md: 11 / 12, xl: 9 / 12}}
        mx="auto"
        pt={{base: 8, sm: 8, md: 8, lg: 0}}
        pl={{md: 20}}
        color="black"
        alignItems="center"
        order={2}
      >
        <Box>
          <chakra.h2
            fontSize={{base: "3xl", sm: "4xl"}}
            fontWeight="extrabold"
            lineHeight="shorter"
            color={headingColor}
            mb={6}
          >
            <chakra.span display="block">{"Patient's View"}</chakra.span>
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
    </Flex>
  );
};

export default PatientSection;
