import React from 'react';
import {gql, useQuery} from '@apollo/client';

//create queries outside the components
const GET_MOVIES = gql`
    {
        movies {
            id
            medium_cover_image
        }
    }
`;

export default () => {
    //useQuery requires a query 
    const { loading, error, data } = useQuery(GET_MOVIES);
    console.log(loading, error, data);
    
    if(loading){
        return 'loading...';
    }
    if(data && data.movies){
        return data.movies.map(movie => <h1>{movie.id}</h1>);
    }
    
};