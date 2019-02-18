import React, { Component } from 'react';

class ArrivingTrains extends Component {
    render() {
        return (
            <div>
                ARRIVING TRAINS:
                <table>
                    <thead>
                        <tr>
                            <td>Juna</td>
                            <td>Lähtöasema</td>
                            <td>Pääteasema</td>
                            <td>Saapuu</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.arrivingTrains.map((train, index) => {
                            return <tr key={index}>
                                <td>
                                    {train.trainType} {train.trainNumber}
                                </td>
                                <td>
                                    {train.timeTableRows[0].stationShortCode} {/* - {new Date(train.timeTableRows[0].scheduledTime).toLocaleString() */}
                                </td>
                                <td>
                                    {train.timeTableRows[train.timeTableRows.length - 1].stationShortCode} {/* - {new Date(train.timeTableRows[train.timeTableRows.length - 1].scheduledTime).toLocaleString() */}
                                </td>
                                <td>
                                    {train.timeTableRows.map(stop => {
                                        if (stop.stationShortCode === this.props.station && stop.type === 'ARRIVAL') {
                                            return (stop.liveEstimateTime !== undefined)
                                                ? new Date(stop.liveEstimateTime).toLocaleTimeString()
                                                : new Date(stop.scheduledTime).toLocaleTimeString();
                                        }
                                    })}
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ArrivingTrains;