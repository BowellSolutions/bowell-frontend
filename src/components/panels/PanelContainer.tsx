import {Box, useStyleConfig} from "@chakra-ui/react";
import {FC, ReactNode} from "react";

interface PanelContainerProps {
  variant?: string,
  children: ReactNode
}

const PanelContainer: FC<PanelContainerProps> = ({variant, children, ...rest}) => {
  const styles = useStyleConfig("PanelContainer", {variant});
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};

export default PanelContainer;
