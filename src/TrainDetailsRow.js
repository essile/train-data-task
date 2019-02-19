import React, { Component } from 'react';

export default class TrainDetailsRow extends Component {

    getStationName = (stationShortCode) => {
        return this.props.allStations.map(station => {
            if (station.stationShortCode === stationShortCode) {
                return station.stationName;
            }
        });
    }

    getLocalTime = (timeObject) => {
        return new Date(timeObject).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
    }

    render() {
        const train = this.props.train;
        return (
            <tr>
                <td>
                    {train.commuterLineID ? `Commuter train ${train.commuterLineID}` : `${train.trainType} ${train.trainNumber}`}
                </td>
                <td>
                    {this.getStationName(train.departureStation)}
                </td>
                <td>
                    {this.getStationName(train.arrivalStation)}
                </td>
                <td>
                    {(train.liveEstimateTime === undefined || train.liveEstimateTime === train.scheduledTime)
                        ? this.getLocalTime(train.scheduledTime)
                        : `${this.getLocalTime(train.liveEstimateTime)} (${this.getLocalTime(train.scheduledTime)})`}
                </td>
                <td>
                    {train.cancelled === true ? ' peruttu' : ''}
                </td>
            </tr>
        );
    }
}