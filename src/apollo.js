import {ApolloClient, InMemoryCache} from "@apollo/client";
// we need to wrap our React app with this client
const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
});

export default client;