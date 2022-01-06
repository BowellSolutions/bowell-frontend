import {Box, BoxProps, useStyleConfig} from "@chakra-ui/react";
import {FC, ReactNode} from "react";

interface CardProps extends BoxProps {
  variant?: string,
  children: ReactNode,
}

const Card: FC<CardProps> = ({variant, children, ...rest}) => {
  const styles = useStyleConfig("Card");
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};

export default Card;
