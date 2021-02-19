import React from 'react';
import {useParams} from 'react-router-dom';
import {gql, useQuery} from '@apollo/client';

//when you need to pass an argument to the query, such as 'id'
//you need to write a name to that query 
//'query getMovie($id: Int)' is only for Apollo, not for the gql server
//inside 'query getMovie($id: Int)', pass the query for the server
const GET_MOVIE = gql`
    query getMovie($id: Int!){
        movie(id: $id){
            id
            title
            medium_cover_image
            description_intro
        }
    }
`;

//I want to get the id from the url
//we can get parameters using useParams()
export default () => {
    const {id} = useParams();

    //this case, we need to provide the id to the useQuery() function
    //we get an error cuz id is String, 1. so we need to type + before id
    //2. or we need to parse the id into int using parseInt()
    //to let useQuery know that it's an int
    const {loading, error, data} = useQuery(GET_MOVIE, {variables: {id: parseInt(id)}});
    console.log(loading, error, data);
    if(loading){
        return 'loading...';
    }
    if(data && data.movie){
        return data.movie.title;
    }
};