import React, { Component } from 'react';
import TrainDetailsRow from './TrainDetailsRow';

class TrainDetailsTable extends Component {

    sortDataByScheduledTime = (trains) => {
        return trains.sort(function (train1, train2) {
            return new Date(train1.scheduledTime) - new Date(train2.scheduledTime)
        });
    }

    render() {
        const trainsInOrder = this.sortDataByScheduledTime(this.props.trains.slice(0, 10));
        return (
            <div>
                {this.props.arrivals ? <h3>Saapuvat</h3> : <h3>Lähtevät</h3>}
                <table>
                    <thead>
                        <tr>
                            <td>Juna</td>
                            <td>Lähtöasema</td>
                            <td>Pääteasema</td>
                            {this.props.arrivals ? <td>Saapuu</td> : <td>Lähtee</td>}
                        </tr>
                    </thead>
                    <tbody>
                        {trainsInOrder.map((train, index) => {
                            return <TrainDetailsRow
                                key={index}
                                train={train}
                                allStations={this.props.allStations}
                                station={this.props.station}
                            />
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TrainDetailsTable;