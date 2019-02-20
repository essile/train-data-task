import React, { Component } from 'react';

export default class TrainDetailsRow extends Component {

    getStationName = (stationShortCode) => {
        return this.props.allStations.map(station => {
            if (station.stationShortCode === stationShortCode) {
                return station.stationName;
            }
            return null;
        });
    }

    getLocalTime = (timeObject) => {
        return new Date(timeObject).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
    }

    render() {
        const train = this.props.train;
        const trainClassName = train.cancelled ? 'cancelledTrain' : 'trainDetailsRow';
        return (
            <tr className={trainClassName}>
                <td className='verticalAlignCenter'>
                    {train.commuterLineID ? `Commuter train ${train.commuterLineID}` : `${train.trainType} ${train.trainNumber}`}
                </td>
                <td className='verticalAlignCenter'>
                    {this.getStationName(train.departureStation)}
                </td>
                <td className='verticalAlignCenter'>
                    {this.getStationName(train.arrivalStation)}
                </td>
                {train.cancelled &&
                    <td>
                        <span className='cancelledTrain'>{this.getLocalTime(train.scheduledTime)}</span><br />
                        <span className='changedSchedule'>Cancelled</span>
                    </td>}
                {!train.cancelled &&
                    <td>
                        {(train.liveEstimateTime === undefined || train.liveEstimateTime === train.scheduledTime)
                            ? <span className='verticalAlignCenter'>{this.getLocalTime(train.scheduledTime)}</span>
                            : <span><span className='changedSchedule'>{this.getLocalTime(train.liveEstimateTime)}</span><br />
                                <span className='delayedTime'>({this.getLocalTime(train.scheduledTime)})</span></span>}
                    </td>}
            </tr>
        );
    }
}