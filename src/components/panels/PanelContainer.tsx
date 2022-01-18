/**
 * @author: Adam Lisichin
 * @file: Exports PanelContainer component - Box with PanelContainer styles from theme
 **/
import {Box, BoxProps, useStyleConfig} from "@chakra-ui/react";
import {FC, ReactNode} from "react";

interface PanelContainerProps extends BoxProps {
  variant?: string,
  children: ReactNode
}

const PanelContainer: FC<PanelContainerProps> = ({variant, children, ...rest}) => {
  const styles = useStyleConfig("PanelContainer");
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};

export default PanelContainer;
