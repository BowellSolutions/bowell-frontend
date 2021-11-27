import {Box, Flex, HStack, Image, Text} from "@chakra-ui/react";
import {Dispatch, FC, SetStateAction, useState} from "react";


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
      shadow="2xl"
      rounded="lg"
    >
      <Flex w="full" overflow="hidden" pos="relative">
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
        >
          &#10094;
        </Text>
        {/* @ts-ignore */}
        <Text
          {...arrowStyles}
          right="0"
          onClick={nextSlide}>
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
