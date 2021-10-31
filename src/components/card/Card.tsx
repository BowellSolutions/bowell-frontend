import {Box, useStyleConfig} from "@chakra-ui/react";
import {FC, ReactNode} from "react";

interface CardProps {
  variant?: string,
  children: ReactNode,
  [x: string]: any, // chakra-ui props - temporary solution
}

const Card: FC<CardProps> = ({variant, children, ...rest}) => {
  const styles = useStyleConfig("Card", {variant});
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};

export default Card;
