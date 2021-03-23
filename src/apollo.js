import {ApolloClient, InMemoryCache, gql} from "@apollo/client";
// we need to wrap our React app with this client
const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
    resolvers: {
        //added isLiked inside the Movie type that we get from backend, it will be stored in cache.
        Movie:{
            isLiked: () => false
        },
        //We can also define mutations on Apollo-graphql Client
        Mutation: {              //pass the cache object to get data from cache
            toggleLikeMovie: (_, {id, isLiked}, {cache}) => {
                //we want to use writeData() of cache object to modify 'isLiked'
                cache.modify({
                    id: `Movie:${id}`,
                    fields: {
                        isLiked: (isLiked) => !isLiked,
                    },
                });
                console.log(cache);
            }
        }
    }
});

export default client;