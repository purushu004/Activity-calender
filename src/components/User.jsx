import React from 'react';

export const User = ({activity, name, userClickHanlder}) => {
    const userLocalClickHandler = () => {
        userClickHanlder(activity, name)
    }
    return <button onClick={userLocalClickHandler} >this is {name}</button>
}
