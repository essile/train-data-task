import React, { Component } from 'react';
import { AllStations } from './ServiceClient';
import TrainDetailsRow from './TrainDetailsRow';

class ArrivingTrains extends Component {

    state = {
        allStations: [],
    }

    componentDidMount() {
        this.fetchAllStations(response => {
            this.setState({ allStations: response });
        });
    }

    getStationName = (stationShortCode) => {
        const stationName = this.state.allStations.map(station => {
            if (station.stationShortCode === stationShortCode) {
                return station.stationName;
            } else {
                return null;
            }
        });
        return stationName;
    }

    fetchAllStations = (callback) => {
        AllStations(response => {
            callback(response.data);
        });
    }

    sortDataByScheduledTime = (trains) => {
        return trains.sort(function (train1, train2) {
            return new Date(train1.scheduledTime) - new Date(train2.scheduledTime)
        });
    }

    render() {
        const arrivingTrainsInOrder = this.sortDataByScheduledTime(this.props.arrivingTrains.slice(0, 10));
        return (
            <div>
                <h3>Saapuvat</h3>
                <table>
                    <thead>
                        <tr>
                            <td>Juna</td>
                            <td>Lähtöasema</td>
                            <td>Pääteasema</td>
                            <td>Saapuu</td>
                        </tr>
                    </thead>
                    {this.state.allStations.length > 0 &&
                        <tbody>
                            {arrivingTrainsInOrder.map((train, index) => {
                                return <TrainDetailsRow key={index} train={train} allStations={this.state.allStations} station={this.props.station} />
                            })}
                        </tbody>}
                </table>
            </div>
        );
    }
}

export default ArrivingTrains;