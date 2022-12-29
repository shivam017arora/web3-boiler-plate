import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { AuthProvider } from "../hooks/useAuth";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </MoralisProvider>
  );
}

export default MyApp;
