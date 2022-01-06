import {Box, BoxProps, useStyleConfig} from "@chakra-ui/react";
import {FC, ReactNode} from "react";

interface MainPanelProps extends BoxProps {
  variant?: string,
  children: ReactNode,
}

const MainPanel: FC<MainPanelProps> = ({variant, children, ...rest}) => {
  const styles = useStyleConfig("MainPanel", {variant: variant});
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};

export default MainPanel;
