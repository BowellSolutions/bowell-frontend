/**
 * @author: Adam Lisichin
 * @file: Exports PatientSection component used on home page
 **/
import React, {FC, useState} from "react";
import {Box, chakra, Flex, useColorModeValue} from "@chakra-ui/react";
import Carousel from "./Carousel";

const slides = [
  {
    img: "/assets/hero_patient_slide.jpg",
    heading: "See your recent activities.",
    descriptions: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam leo libero, molestie sit amet aliquet ' +
      'placerat, interdum a dui. Quisque aliquet, ante vitae congue venenatis, metus nisl tempus lorem, id ornare ' +
      'mattis, turpis et porttitor tempor, odio velit rhoncus eros, sit amet mattis eros neque eu libero.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut placerat hendrerit odio, convallis feugiat elit ' +
      'congue sed. Cras interdum diam erat, sed blandit quam sodales sed.'
    ],
  },
  {
    img: "/assets/hero_patient_slide.jpg",
    heading: "Look at your appointments",
    descriptions: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut placerat hendrerit odio, convallis feugiat elit ' +
      'congue sed. Cras interdum diam erat, sed blandit quam sodales sed.',
      '\'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas diam dolor, dapibus sed augue non, ultricies laoreet ante. Fusce molestie tortor nisl, nec lacinia tortor dictum in.'
    ]
  },
  {
    img: "/assets/hero_patient_slide.jpg",
    heading: "Sign up for a new appointment",
    descriptions: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas diam dolor, dapibus sed augue non, ultricies laoreet ante. Fusce molestie tortor nisl, nec lacinia tortor dictum in. Suspendisse pellentesque, lacus at lobortis commodo, dui ipsum egestas nisl, vitae eleifend metus justo mollis nulla. Morbi vitae magna vel augue tristique posuere quis sed leo. Curabitur malesuada venenatis vulputate. Proin faucibus lectus.'
    ]
  },
  {
    img: "/assets/hero_patient_slide.jpg",
    heading: "View analysis' results",
    descriptions: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget arcu dictum, bibendum lacus at, semper mauris. Suspendisse imperdiet vestibulum lorem. Vivamus semper erat mi, quis faucibus sem porttitor a. Sed laoreet leo id nulla dignissim, sed luctus nulla ullamcorper.',
      'Integer scelerisque mi ac lorem lacinia, id aliquam purus laoreet. Aliquam nec metus vehicula.',
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
      px={{sm: 8, md: 12, lg: 16}}
      pt={{base: 0, md: 8}}
      pb={{sm: 4, md: 16}}
      mx="auto"
      id="patient-section"
    >
      <Flex order={1} w="full">
        <Carousel slides={slides} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide}/>
      </Flex>

      <Flex
        w={{base: "full", md: 11 / 12, xl: 9 / 12}}
        mx="auto"
        pt={{sm: 8, md: 8, lg: 0}}
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
