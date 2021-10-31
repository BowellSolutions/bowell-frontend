import '../styles/globals.scss';
import type {AppProps} from 'next/app';
import {useStore} from "../redux/store";
import {Provider} from "react-redux";
import {ChakraProvider} from "@chakra-ui/react";
import theme from "../theme/theme";

function MyApp({Component, pageProps}: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    // @ts-ignore
    <Provider store={store}>
      <ChakraProvider theme={theme} resetCSS>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
