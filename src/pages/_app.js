import { Provider as ReduxProvider } from "react-redux";
import store from "../app/store";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import "rsuite/dist/rsuite.min.css";

export default function App({ Component, pageProps }) {
  // const { auth } = Component;
  return (
    <SessionProvider session={pageProps.session}>
      <ReduxProvider store={store}>
        {/* False added to skip over auth */}
        {/* {Component.auth && false ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : ( */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
        {/* )} */}
      </ReduxProvider>
    </SessionProvider>
  );
}
