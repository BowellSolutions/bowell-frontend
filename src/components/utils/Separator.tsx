/**
 * @author: Adam Lisichin
 * @file: Exports Separator component
 **/
import React, {FC, ReactNode} from "react";
import {Flex} from "@chakra-ui/react";

interface SeparatorProps {
  variant?: string,
  children?: ReactNode,
}

/**
 * Component used for separating content horizontally.
 */
export const Separator: FC<SeparatorProps> = ({variant, children, ...rest}) => {
  return (
    <Flex
      h="1px"
      w="100%"
      bg="linear-gradient(90deg, rgba(224, 225, 226, 0) 0%, #E0E1E2 49.52%, rgba(224, 225, 226, 0) 100%)"
      {...rest}
    >
      {children}
    </Flex>
  );
};
