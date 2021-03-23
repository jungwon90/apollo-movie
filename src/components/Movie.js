import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {gql, useMutation} from '@apollo/client';

//mutation likeMovie(id: $id) @client 
//-> need to tell Apollo that this mutation is on client
//because we don't want to send this mutation to the backend
const LIKE_MOVIE = gql`
    mutation toggleLikeMovie($id: Int!, $isLiked: Boolean!){
        toggleLikeMovie(id: $id, isLiked: $isLiked) @client
    }
`;

const Container = styled.div`
    height: 400px;
    border-radius: 7px;
    width: 100%;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    background-color: transparent;
`;
    
const Poster = styled.div`
    background-image: url(${props => props.bg});
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center center;
    border-radius: 7px;
`;


export default ({id, bg, isLiked}) => {
    //useMutation() will give me a mutation as the first element in the array.
    const [toggleLikeMovie] = useMutation(LIKE_MOVIE, {variables: {id: parseInt(id), isLiked}})
    return (
        <Container>
            <Link to={`/${id}`}>
                <Poster bg={bg}/>
            </Link>
            <button onClick={toggleLikeMovie}>{isLiked ? "Unlike" : "Like"}</button>
        </Container>
    );
};

