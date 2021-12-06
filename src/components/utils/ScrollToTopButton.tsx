import {Button, Icon, useColorModeValue} from "@chakra-ui/react";
import {FC, useEffect, useState} from "react";
import {BsChevronUp} from "react-icons/bs";

const styles = {
  active: {
    visibility: "visible",
    transition: "visibility 0s, opacity 1s linear",
  },
  hidden: {
    visibility: "hidden",
    transition: "visibility 0s, opacity 0.75s linear",
  },
};

const ScrollToTopButton: FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const navbarIcon = useColorModeValue("gray.500", "gray.200");
  const bgButton = useColorModeValue("white", "gray.600");

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    setVisible(scrolled >= 250);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <Button
      h="52px"
      w="52px"
      onClick={handleScrollToTop}
      bg={bgButton}
      position="fixed"
      variant="no-hover"
      left=""
      right="35px"
      bottom="30px"
      borderRadius="50px"
      boxShadow="0 2px 12px 0 rgb(0 0 0 / 16%)"
      opacity={Number(visible)}
      zIndex={1000}
      // @ts-ignore
      className={visible ? styles.active : styles.hidden}
      id="scroll-to-top-button"
    >
      <Icon
        as={BsChevronUp}
        cursor="pointer"
        color={navbarIcon}
        w="20px"
        h="20px"
      />
    </Button>
  );
};

export default ScrollToTopButton;
