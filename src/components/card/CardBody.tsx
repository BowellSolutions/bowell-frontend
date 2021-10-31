import {Box, useStyleConfig} from "@chakra-ui/react";
import {FC, ReactNode} from "react";

interface CardBodyProps {
  variant?: string,
  children: ReactNode,
  [x: string]: any, // chakra-ui props - temporary solution
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
