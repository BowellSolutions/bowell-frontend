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
 * @file: Exports Carousel component used in Patient and Doctor sections
 **/
import {Box, Flex, HStack, Image, Text} from "@chakra-ui/react";
import {Dispatch, FC, SetStateAction} from "react";


interface Slide {
  img: string;
}

interface CarouselProps {
  slides: Slide[];
  currentSlide: number,
  setCurrentSlide: Dispatch<SetStateAction<number>>,
}


const arrowStyles = {
  cursor: "pointer",
  pos: "absolute",
  top: "50%",
  w: "auto",
  mt: "-22px",
  p: "16px",
  color: "gray.400",
  fontWeight: "bold",
  fontSize: "18px",
  transition: "0.6s ease",
  borderRadius: "0 3px 3px 0",
  userSelect: "none",
  _hover: {
    color: "gray.700",
  },
};

const Carousel: FC<CarouselProps> = ({slides, currentSlide, setCurrentSlide}) => {
  const slidesCount = slides.length;

  const prevSlide = () => {
    setCurrentSlide((s: number) => (s === 0 ? slidesCount - 1 : s - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((s: number) => (s === slidesCount - 1 ? 0 : s + 1));
  };

  const setSlide = (slide: number) => setCurrentSlide(slide);

  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };

  return (
    <Flex
      w="full"
      alignItems="center"
      justifyContent="center"
      className="carousel"
    >
      <Flex w="full" overflow="hidden" pos="relative" shadow="2xl" rounded="lg">
        <Flex w="full" {...carouselStyle}>
          {slides.map((slide, sid) => (
            <Image
              w="full"
              flex="none"
              rounded="lg"
              src={slide.img}
              boxSize="full"
              backgroundSize="cover"
              alt=""
              key={`slide-${sid}`}
            />
          ))}
        </Flex>

        {/* arrows */}
        {/* @ts-ignore */}
        <Text
          {...arrowStyles}
          left="0"
          onClick={prevSlide}
          className="arrow-left"
        >
          &#10094;
        </Text>
        {/* @ts-ignore */}
        <Text
          {...arrowStyles}
          right="0"
          onClick={nextSlide}
          className="arrow-right"
        >
          &#10095;
        </Text>

        {/* dots */}
        <HStack justify="center" pos="absolute" bottom="8px" w="full">
          {Array.from({length: slidesCount}).map((_, slide) => (
            <Box
              key={`dots-${slide}`}
              cursor="pointer"
              boxSize={["6px", "10px"]}
              m="0 2px"
              bg={currentSlide === slide ? "blackAlpha.800" : "blackAlpha.500"}
              rounded="50%"
              display="inline-block"
              transition="background-color 0.6s ease"
              _hover={{bg: "blackAlpha.800"}}
              onClick={() => setSlide(slide)}
            />
          ))}
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Carousel;
