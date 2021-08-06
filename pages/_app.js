import "../styles/tailwind.css";
import "../styles/style.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { isLoggedVar } from "../cache";
import { useEffect } from "react";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      isLoggedVar(true);
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
