import "../styles/tailwind.css";
import "../styles/style.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { isLoggedVar } from "../cache";
import { useEffect } from "react";

//I kind of hate SSR

let client;

if (typeof window !== "undefined") {
  const httpLink = createHttpLink({
    uri: "http://localhost:4000",
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        ...headers,
        authorization: token || "null",
      },
    };
  });

  client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      isLoggedVar(true);
    }
  }, []);

  if (typeof window !== "undefined") {
    return (
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    );
  }

  return null;
}

export default MyApp;
