import '../styles/globals.scss';
import type {AppProps} from 'next/app';
import {wrapper} from "../redux/store";
import {ChakraProvider} from "@chakra-ui/react";
import theme from "../theme/theme";
import WebsocketContextProvider from "../components/context/WebsocketContext";

function MyApp({Component, pageProps}: AppProps) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <WebsocketContextProvider>
        <Component {...pageProps} />
      </WebsocketContextProvider>
    </ChakraProvider>
  );
}

export default wrapper.withRedux(MyApp);
