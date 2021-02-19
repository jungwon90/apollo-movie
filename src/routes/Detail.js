import React from 'react';
import {useParams} from 'react-router-dom';
import {gql, useQuery} from '@apollo/client';
import styled from 'styled-components';

//when you need to pass an argument to the query, such as 'id'
//you need to write a name to that query 
//'query getMovie($id: Int)' is only for Apollo, not for the gql server
//inside 'query getMovie($id: Int)', pass the query for the server
const GET_MOVIE = gql`
    query getMovie($id: Int!){
        movie(id: $id){
            title
            medium_cover_image
            language
            rating
            description_intro
        }
    }
`;

const Container = styled.div`
    height: 100vh;
    background-image: linear-gradient(-45deg, #d754ab, #fd723a);
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: white;
`;

const Column = styled.div`
    margin-left: 10px;
`;

const Title = styled.h1`
    font-size: 65px;
    margin-bottom: 15px;
`;

const Subtitle = styled.h4`
    font-size: 35px;
    margin-bottom: 10px;
`;

const Description = styled.p`
    font-size: 28px;
`;

const Poster = styled.div`
    background-image: url(${props => props.bg});
    width: 25%;
    height: 60%;
    background-color: transparent;
`;


//I want to get the id from the url
//we can get parameters using useParams()
export default () => {
    const {id} = useParams();

    //this case, we need to provide the id to the useQuery() function
    //we get an error cuz id is String, 1. so we need to type + before id
    //2. or we need to parse the id into int using parseInt()
    //to let useQuery know that it's an int
    const {loading, error, data} = useQuery(GET_MOVIE, {
        variables: {id: parseInt(id)}
    });
    console.log(loading, error, data);
    const movie = data.movie;
    
    return (
        <Container>
            <Column>
                <Title>{movie.title}</Title>
                <Subtitle>{movie.language} {movie.rating}</Subtitle>
                <Description>{movie.description_intro}</Description>
            </Column>
            <Poster bg={movie.medium_cover_image}/>
        </Container>
    );
};