import React , { Fragment }from 'react';

export const SelectedActivity = props => {
return (props.currentWorkTimings.length == 0)? <h2>{props.name} has no activity on selected day</h2>:<Fragment><h2>{props.name}'s work timings are </h2><ul><li>start_time{props.currentWorkTimings[0]}</li><li>start_time{props.currentWorkTimings[1]}</li></ul></Fragment>
}