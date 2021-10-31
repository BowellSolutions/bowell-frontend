import {Box, useStyleConfig} from "@chakra-ui/react";
import {FC, ReactNode} from "react";

interface CardHeaderProps {
  variant?: string,
  children: ReactNode,
  [x: string]: any, // chakra-ui props - temporary solution
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
