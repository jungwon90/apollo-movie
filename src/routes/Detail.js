import React from 'react';
import {useParams} from 'react-router-dom';

//we can get parameters using useParams()
export default () => {
    const {id} = useParams();
    console.log(id)
    return "Detail";
};