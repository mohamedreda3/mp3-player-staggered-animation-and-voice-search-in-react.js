import React from 'react'
import Header from './header';
import Main from './main';
import Home from './home';

function Homepage(props) {
   
    return (
        <>
            <Home reciters={props.reciters} />
        </>
    )
}

export default Homepage