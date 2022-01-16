export const buttonStyles = {
  components: {
    Button: {
      variants: {
        "no-hover": {
          _hover: {
            boxShadow: "none",
          },
        },
        "transparent-with-icon": {
          bg: "transparent",
          fontWeight: "bold",
          borderRadius: "inherit",
          cursor: "pointer",
          _active: {
            bg: "transparent",
            transform: "none",
            borderColor: "transparent",
          },
          _focus: {
            boxShadow: "none",
          },
          _hover: {
            boxShadow: "none",
          },
        },
        "with-shadow": {
          boxShadow: "0 0 2px 2px #efdfde",
        },
      },
      baseStyle: {
        borderRadius: "15px",
        _focus: {
          boxShadow: "none",
        },
      },
    },
  },
};
