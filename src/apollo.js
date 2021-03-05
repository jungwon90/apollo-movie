import {ApolloClient, InMemoryCache} from "@apollo/client";
// we need to wrap our React app with this client
const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
    resolvers: {
        //added isLiked inside the Movie type that we get from backend, it will be stored in cache.
        //combining data from back-end and data from fron-end
        Movie:{
            isLiked: () => false
        }
    }
});

export default client;