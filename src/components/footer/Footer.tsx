import {Flex, Link, Text} from "@chakra-ui/react";
import React from "react";
import {useRouter} from "next/router";

const Footer = () => {
  const router = useRouter();

  return (
    <Flex
      flexDirection={{base: "column", xl: "row",}}
      alignItems={{base: "center", xl: "start",}}
      justifyContent={
        router.pathname === "/register"
        ? "center"
        : "space-between"
      }
      px="30px"
      pb="20px"
    >
      <Text
        color="gray.400"
        textAlign={{base: "center", xl: "start",}}
        mb={{base: "20px", xl: "0px"}}
      >
        <Text as="span">{"Made by "}</Text>

        <Link
          color="teal.400"
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
