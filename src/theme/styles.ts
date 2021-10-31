import {mode, StyleFunctionProps} from "@chakra-ui/theme-tools";
import {Dict} from "@chakra-ui/utils";

export const globalStyles = {
  colors: {
    gray: {
      700: "#1f2733",
    },
  },
  styles: {
    global: (props: Dict | StyleFunctionProps) => ({
      body: {
        bg: mode("gray.50", "gray.800")(props),
        fontFamily: 'Helvetica, sans-serif'
      },
      html: {
        fontFamily: 'Helvetica, sans-serif'
      }
    }),
  },
};
