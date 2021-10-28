import '../styles/globals.scss';
import type {AppProps} from 'next/app';
import {useStore} from "../redux/store";
import {Provider} from "react-redux";
import {ChakraProvider} from "@chakra-ui/react";

function MyApp({Component, pageProps}: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    // @ts-ignore
    <Provider store={store}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
