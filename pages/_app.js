import "../styles/tailwind.css";
import "../styles/style.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

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
        authorization: token ? `Bearer ${token}` : "null",
      },
    };
  });

  client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

function MyApp({ Component, pageProps }) {
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
