/**
 * @author: Adam Lisichin
 * @file: Exports Footer component
 **/
import {Flex, Link, Text} from "@chakra-ui/react";
import {FC} from "react";

interface FooterProps {
  textColor?: string,
  linkColor?: string,
}

const Footer: FC<FooterProps> = ({textColor = 'gray.400', linkColor = 'teal.400'}) => {
  return (
    <Flex
      flexDirection={{base: "column", xl: "row",}}
      alignItems={{base: "center", xl: "start",}}
      justifyContent={"center"}
      px="30px"
      pb="20px"
    >
      <Text
        color={textColor}
        textAlign={{base: "center", xl: "start",}}
        mb={{base: "20px", xl: "0px"}}
      >
        <Text as="span">{"Made by "}</Text>

        <Link
          color={linkColor}
          fontWeight="600"
          href="https://github.com/BowellSolutions"
          target="_blank"
        >
          {"Bowell Solutions "}
        </Link>

        <Text as="span">&copy; 2021 </Text>
      </Text>
    </Flex>
  );
};

export default Footer;
