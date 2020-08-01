import React from 'react';

export const User = ({activity, name, userClickHanlder}) => {
    const userLocalClickHandler = () => {
        userClickHanlder(activity, name)
    }
    return <button type="button" className="user-item btn btn-dark d-block mx-auto px-md-5 mb-3" onClick={userLocalClickHandler} >{name}</button>
}
