import React from 'react';
import {gql, useQuery} from '@apollo/client';
import styled from 'styled-components';
import Movie from '../components/Movie';


//create queries outside the components
const GET_MOVIES = gql`
    {
        movies {
            id
            medium_cover_image
        }
    }
`;

//Define Container component using styled-component
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%
`;

//Define Header component using styled-component
const Header = styled.header`
    background-image: linear-gradient(-45deg, #d754ab, #fd723a);
    height: 45vh;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

//Define Title component using styled-component
const Title = styled.h1`
    font-size: 60px;
    font-weight: 600;
    margin-bottom: 20px;
`;

//Define Subtitle component using styled-component
const Subtitle = styled.h3`
    font-size: 35px;
`;

//Define Loading component using styled-component
const Loading = styled.div`
    font-size: 18px;
    opacity: 0.5;
    font-weight: 500;
    margin-top: 10px;
`;

export default () => {
    //useQuery requires a query 
    const { loading, error, data } = useQuery(GET_MOVIES);
    console.log(loading, error, data);
    
    /**
    <Container> -> The container centers your content horizontally. 
    It's the most basic layout element.
     */
    return(
        <Container>
            <Header>
                <Title>Apollo Movie</Title>
                <Subtitle>I Love GraphQL</Subtitle>
            </Header>
            {loading && <Loading>Loading...</Loading>}
            {!loading && data.movies && data.movies.map(movie => <Movie key={movie.id} id={movie.id}/>)}
        </Container>
    );  
};