import { SessionProvider } from "next-auth/react";
import Role from "../components/core/Role";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Role>
        <Component {...pageProps} />
      </Role>
    </SessionProvider>
  );
}

export default MyApp;
