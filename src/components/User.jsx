import React from 'react';

export function User(props){
    function userLocalClickHandler(){
        console.log("Click handler was triggered");
        props.userClickHanlder(props.activity, props.name)
    }
    return <button onClick={userLocalClickHandler}>this is {props.name}</button>
}


