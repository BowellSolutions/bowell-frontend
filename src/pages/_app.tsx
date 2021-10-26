import '../styles/globals.scss';
import type {AppProps} from 'next/app';
import {useStore} from "../redux/store";
import {Provider} from "react-redux";

function MyApp({Component, pageProps}: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    // @ts-ignore
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
