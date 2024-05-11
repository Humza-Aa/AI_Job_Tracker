import { border, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: "black",
        color: "white",
      },
      a: {
        color: "teal.500",
        _hover: {
          textDecoration: "underline",
        },
      },
      "::-webkit-scrollbar": {
        width: "10px",
      },
      "::-webkit-scrollbar-track:hover": {
        cursor: "pointer",
      },
      "::-webkit-scrollbar-track": {
        backgroundColor: "blackAlpha.900",
        borderRadius: "10px",
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: "whiteAlpha.300",
        borderRadius: "8px",
      },
      "::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "whiteAlpha.400",
        cursor: "pointer",
      },
    },
  },
});

export default theme;
