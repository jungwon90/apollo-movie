import React from 'react';
import {useParams} from 'react-router-dom';
import {gql, useQuery} from '@apollo/client';
import styled from 'styled-components';
import Movie from '../components/Movie';

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
            language
            rating
            description_intro
            isLiked @client
        }
        suggestions(id: $id){
            id
            medium_cover_image
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
    width: 50%;
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
    background-size: cover;
    background-position: center center;
    background-color: transparent;
`;

//Define Movies component using styled-component
const Movies = styled.div`
    display: flex;
    grid-gap: 25px;
    width: 60%;
    top: -50px;
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
    
    return (
        <Container>
            <Column>
                <Title>{loading ? "Loading..." : `${data.movie.title} ${data.movie.isLiked ? '💘' : '😞'}`}</Title>
                {!loading && data.movie && <Subtitle>{data.movie.language} {data.movie.rating}</Subtitle>}
                {!loading && data.movie && <Description>{data.movie.description_intro}</Description>}
            </Column>
            <Poster bg={data && data.movie ? data.movie.medium_cover_image : ""}/>
            {!loading && data && data.suggestions &&(
            <Movies>
                {data.suggestions.map(movie => (
                <Movie key={movie.id} id={movie.id} bg={movie.medium_cover_image}/>
                ))}
            </Movies>
            )}
        </Container>
     
    );
};