import {Flex, FlexProps} from "@chakra-ui/react";
import {FC, ReactNode} from "react";

interface IconBoxProps extends FlexProps {
  children: ReactNode,
}

const IconBox: FC<IconBoxProps> = ({children, ...rest}) => {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={"12px"}
      {...rest}
    >
      {children}
    </Flex>
  );
};

export default IconBox;
