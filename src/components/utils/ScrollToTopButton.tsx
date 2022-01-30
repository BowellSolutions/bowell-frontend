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
 * @file: Exports ScrollToTopButton component
 **/
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

/**
 * Floating button which appears when window is scrolled at least to 250px.
 * When clicked makes page scroll to the top.
 */
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
    // attach toggleVisible on mount, remove on unmount
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
