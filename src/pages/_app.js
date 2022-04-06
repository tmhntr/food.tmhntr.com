import { Provider as ReduxProvider } from "react-redux";
import store from "../app/store";
import { SessionProvider } from "next-auth/react";
import Auth from "../components/Auth";
import "rsuite/styles/index.less";

export default function App({ Component, pageProps }) {
  const { auth } = Component;
  return (
    <SessionProvider session={pageProps.session}>
      <ReduxProvider store={store}>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </ReduxProvider>
    </SessionProvider>
  );
}
