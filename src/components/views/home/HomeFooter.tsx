import React, {FC} from "react";
import {Link, Text} from "@chakra-ui/react";

const HomeFooter: FC = () => {
  return (
    <footer className="footer">
      <div className="credit">
        <Text
          color="gray.400"
          textAlign={{base: "center", xl: "start",}}
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
      </div>
    </footer>
  );
};

export default HomeFooter;
