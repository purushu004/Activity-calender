import React , { Fragment }from 'react';

export const SelectedActivity = ({currentWorkTimings, name}) => {
  const isCurrentWorkingTimes = (currentWorkTimings) => {
    return (currentWorkTimings.length === 0)? 
        <h2>{name} has no activity on selected day</h2> : 
        <Fragment>
          <h2>{name}'s work timings are </h2>
          <ul>
            <li>Start Time{currentWorkTimings[0]}</li>
            <li>End Time{currentWorkTimings[1]}</li>
          </ul>
        </Fragment>
  }
  return isCurrentWorkingTimes(currentWorkTimings)
}
