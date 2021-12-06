import {Box, BoxProps, useStyleConfig} from "@chakra-ui/react";
import {FC, ReactNode} from "react";

interface CardBodyProps extends BoxProps {
  variant?: string,
  children: ReactNode,
}

const CardBody: FC<CardBodyProps> = ({variant, children, ...rest}) => {
  const styles = useStyleConfig("CardBody", {variant});
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};

export default CardBody;
