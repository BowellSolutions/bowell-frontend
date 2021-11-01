import '../styles/globals.scss';
import type {AppProps} from 'next/app';
import {wrapper} from "../redux/store";
import {ChakraProvider} from "@chakra-ui/react";
import theme from "../theme/theme";

function MyApp({Component, pageProps}: AppProps) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default wrapper.withRedux(MyApp);
