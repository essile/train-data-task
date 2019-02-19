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
        console.log('haetaan all stations')
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
        // function to check for duplicate arrival -- return new array. that will be sorted on next line
        const arrivingTrainsInOrder = this.sortDataByScheduledTime(this.props.arrivingTrains.slice(0, 10));
        console.log('arriving.js', this.props.arrivingTrains);
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
                    {this.state.allStations.length > 0 &&
                        <tbody>
                            {arrivingTrainsInOrder.map((train, index) => {
                                // console.log('junaa tutkitaa', train)
                                return <TrainDetailsRow key={index} train={train} allStations={this.state.allStations} station={this.props.station} />
                            })}
                        </tbody>}
                </table>
            </div>
        );
    }
}

export default ArrivingTrains;