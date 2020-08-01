import React, { Component, Fragment } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { User } from './../components/User';
import { NullComponent }from './../components/NullComponent';
import { SelectedActivity }from './../components/SelectedActivity';

class Home extends Component {
    constructor(props){
        super(props);
             
        this.state = {
            data : [],
            isModalOpen: false,
            currentUser:"",
            currentUserActivity: [],
            currentUserEvents:[],
            isDateActivitySelected: false,
            selectedDateUserActivity: []
        }

        this.modalToggler = this.modalToggler.bind(this);
        this.modalClickHandler = this.modalClickHandler.bind(this);
        this.generateDateFromString = this.generateDateFromString.bind(this);
        this.getMonth = this.getMonth.bind(this);
        this.getTimeInDefaultFormat = this.getTimeInDefaultFormat.bind(this);
        this.dateSelectHandler = this.dateSelectHandler.bind(this);
        this.getUsersData = this.getUsersData.bind(this)
    }

    getUsersData(url) {
        fetch(url)
        .then(response => response.json())
        .then(data => this.setState({
            data: data.users
        }));
    }
    componentDidMount() {
        this.getUsersData('https://raw.githubusercontent.com/purushu004/Activity-calender/master/src/db.json')
    }

    modalClickHandler(param,user) {
        var eventDates = [];
        this.modalToggler();
        this.setState({currentUserActivity: param})
        param.map((activity) => eventDates.push(
            {
                title: "Working Hours",
                start: this.generateDateFromString(activity.start_time),
                end: this.generateEndDateFromString(activity.end_time),
                allDay: true
            }
        ));
        this.setState({
            currentUserEvents: eventDates 
        });
        this.setState({
            currentUser: user
        })
    }

    modalToggler() {
        this.setState(prevState => ({
            isModalOpen: !prevState.isModalOpen
        }))
    }

    getDayStart(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate()) 
    }

    generateDateFromString(stringDate) {
        var division = stringDate.split("  "),
            finalMonth,
            finalTime;
        const [month, day, year] = division[0].split(" ");
        const  time  = division[1];
        finalMonth = this.getMonth(month.toLowerCase());
        finalTime = this.getTimeInDefaultFormat(time)
        var convertedDate = new Date(year, finalMonth, day,finalTime[0], finalTime[1])
        return convertedDate;
    }

    generateEndDateFromString(stringDate) {
        const [month, day, year, time] = stringDate.split(" ");
        var finalMonth = this.getMonth(month.toLowerCase()),
        finalTime = this.getTimeInDefaultFormat(time);
        var convertedDate = new Date(year, finalMonth, day,finalTime[0], finalTime[1])
        return convertedDate;
    }

    getMonth(monthString) {
        var months = ["", "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        var isMonthMatch = (element) => element === monthString;
        var index = months.findIndex(isMonthMatch);
        return index;
    }

    getTimeInDefaultFormat(time) {
        let [hours, minutes, AMPM] = time.match(/([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])\s*([AaPp][Mm])/);
            hours = Number(hours);
            minutes = Number(minutes);
        if(AMPM === "PM" && hours<12) hours = hours+12;
        if(AMPM === "AM" && hours===12) hours = hours-12;
        var sHours = hours.toString();
        var sMinutes = minutes.toString();
        if(hours<10) sHours = "0" + sHours;
        if(minutes<10) sMinutes = "0" + sMinutes;
        return [sHours, sMinutes]
    }
    
    dateSelectHandler(e) {
        var filtered_activityDate = [];
        this.state.currentUserActivity.map(activity => {
            if(e.start.toString() === this.getDayStart(this.generateDateFromString(activity.start_time)).toString()){
                filtered_activityDate = [this.generateDateFromString(activity.start_time).toString(), this.generateEndDateFromString(activity.end_time).toString()];
            }
        });
        this.setState({
            selectedDateUserActivity : filtered_activityDate,
            isDateActivitySelected: true
        })
    }
    render() {
        this.generateDateFromString("Feb 1 2020  1:33PM");
        return(
            <Fragment>
                <div class="container border shadow-lg p-3 mb-5 bg-white rounded">
                    <h2 class="d-flex justify-content-center">Users List</h2>
                    <div class="d-block mx-auto">
                        {this.state.data === [] ? null : this.state.data.map((user, i) => <User key={i} name={user.real_name} userClickHanlder={this.modalClickHandler} activity={user.activity_periods}/>)}
                    </div>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.modalToggler} size="lg">
                        <ModalHeader toggle={this.modalToggler}>{this.state.currentUser}'s Timeline</ModalHeader>
                        <ModalBody>
                            <Calendar
                                popup
                                localizer={momentLocalizer(moment)}
                                events = {this.state.currentUserEvents}
                                style={{ height: 600 }}
                                onSelectSlot={this.dateSelectHandler}
                                selectable={true}
                                defaultDate={new Date(2020, 2, 1)}
                            />
                            {
                                (!this.state.isDateActivitySelected)? <NullComponent/> : <SelectedActivity currentWorkTimings={this.state.selectedDateUserActivity} name={this.state.currentUser}/>
                            }
                        </ModalBody>
                        <ModalFooter>
                        <Button color="secondary" onClick={this.modalToggler}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </Fragment>
        )
    }
}

export default Home;
