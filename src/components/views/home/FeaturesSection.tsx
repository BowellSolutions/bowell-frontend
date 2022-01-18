/**
 * @author: Adam Lisichin
 * @file: Exports FeatureSection component used on home page
 **/
import {Box, chakra, Flex, Icon, SimpleGrid, useColorModeValue} from "@chakra-ui/react";
import {FC, ReactNode} from "react";

interface FeatureProps {
  color: string,
  title: string,
  icon: JSX.Element,
  children: ReactNode,
}


const Feature: FC<FeatureProps> = (props) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      _hover={{
        shadow: "xl",
        cursor: "default",
      }}
      shadow="lg"
      p={{sm: 2, lg: 4}}
      rounded="lg"
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        w={8}
        h={8}
        mb={4}
        rounded="full"
        color={useColorModeValue(`${props.color}.600`, `${props.color}.100`)}
        bg={useColorModeValue(`${props.color}.100`, `${props.color}.600`)}
      >
        <Icon
          boxSize={5}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          {props.icon}
        </Icon>
      </Flex>
      <chakra.h3
        mb={2}
        fontWeight="semibold"
        lineHeight="shorter"
        color={useColorModeValue("gray.900", "")}
      >
        {props.title}
      </chakra.h3>
      <chakra.p
        fontSize="sm"
        color={useColorModeValue("gray.500", "gray.400")}
      >
        {props.children}
      </chakra.p>
    </Box>
  );
};

export default function FeaturesSection() {
  return (
    <Flex
      p={{sm: 2, md: 2}}
      px={{lg: 16}}
      py={{lg: 8}}
      w="auto"
      bg={useColorModeValue("", "gray.700")}
      justifyContent="center"
      alignItems="center"
      id="features-section"
    >
      <Box
        px={8}
        py={8}
        mx="auto"
      >
        <Box textAlign={{lg: "center"}}>
          <chakra.p
            mt={2}
            fontSize={{base: "3xl", sm: "4xl"}}
            lineHeight="8"
            fontWeight="extrabold"
            letterSpacing="tight"
            color={useColorModeValue("gray.900", "")}
          >
            Features
          </chakra.p>
          
          <chakra.p
            mt={4}
            maxW="2xl"
            fontSize="xl"
            mx={{lg: "auto"}}
            color={useColorModeValue("gray.500", "gray.400")}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam scelerisque, lacus sit amet sodales.
          </chakra.p>
        </Box>

        <SimpleGrid
          columns={{base: 1, sm: 2, md: 3, lg: 4}}
          spacingX={{sm: 8, md: 16, lg: 24}}
          spacingY={{sm: 10, lg: 20}}
          mt={6}
        >
          <Feature
            color="red"
            title="Personal Emails"
            icon={<Icon/>}
          >
            Nullam elementum, metus eu lacinia egestas, orci diam ornare odio, non faucibus.
          </Feature>

          <Feature
            color="pink"
            title="Why a beaker icon?"
            icon={<Icon/>}
          >
            Nulla ex lectus, varius at congue eget, porta id nunc. Sed interdum.
          </Feature>

          <Feature
            color="yellow"
            title="Clickable"
            icon={<Icon/>}
          >
            Etiam gravida consequat dapibus. Morbi aliquam varius velit nec malesuada. Nulla lectus.
          </Feature>

          <Feature
            color="green"
            title="Finger Printing"
            icon={<Icon/>}
          >
            Maecenas purus est, dapibus at est et, ullamcorper aliquam velit. Nulla purus.
          </Feature>
          <Feature
            color="purple"
            title="Performance on Fire"
            icon={<Icon/>}
          >
            Nullam orci tellus, varius sed dictum vel, consectetur et turpis. Curabitur mattis.
          </Feature>
          <Feature
            color="blue"
            title="Love is in the Air"
            icon={<Icon/>}
          >
            Integer pretium odio felis, et lobortis diam malesuada ac. Aliquam et pharetra.
          </Feature>
          <Feature
            color="brand"
            title="Thunder and Lightning"
            icon={<Icon/>}
          >
            In orci augue, malesuada non mollis a, dictum sit amet dolor. Sed.
          </Feature>

          <Feature
            color="purple"
            title="Puzzles"
            icon={<Icon/>}
          >
            Nullam nec augue orci. Donec ac velit non turpis malesuada luctus. Nam.
          </Feature>

          <Feature
            color="pink"
            title="Sparkles"
            icon={<Icon/>}
          >
            Fusce justo purus, semper id euismod at, ornare vitae nibh. Donec dignissim.
          </Feature>

          <Feature
            color="red"
            title="Stars"
            icon={<Icon/>}
          >
            Donec non justo nec purus viverra sodales sit amet a felis. Sed.
          </Feature>

          <Feature
            color="green"
            title="Support"
            icon={<Icon/>}
          >
            Donec aliquet, felis eu faucibus pretium, erat nulla ultrices nibh, a fringilla.
          </Feature>

          <Feature
            color="blue"
            title="Finger Printing for Robots"
            icon={<Icon/>}
          >
            In hac habitasse platea dictumst. Curabitur eu laoreet nulla. Phasellus viverra ligula.
          </Feature>
        </SimpleGrid>
      </Box>
    </Flex>
  );
}
