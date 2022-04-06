import { Provider } from "react-redux";
import store from "../app/store";
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"


export default function App({
  Component,
  pageProps,
}: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}
