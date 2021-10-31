import {Box, useStyleConfig} from "@chakra-ui/react";
import {FC, ReactNode} from "react";

interface PanelContentProps {
  variant?: string,
  children: ReactNode
}

const PanelContent: FC<PanelContentProps> = ({variant, children, ...rest}) => {
  const styles = useStyleConfig("PanelContent", {variant});
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};

export default PanelContent;
