import {Box, BoxProps, useStyleConfig} from "@chakra-ui/react";
import {FC, ReactNode} from "react";

interface CardHeaderProps extends BoxProps {
  variant?: string,
  children: ReactNode,
}

const CardHeader: FC<CardHeaderProps> = ({variant, children, ...rest}) => {
  const styles = useStyleConfig("CardHeader", {variant});
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};

export default CardHeader;
