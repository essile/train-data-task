import React, { Component } from 'react';
import { Table } from 'reactstrap';
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
                <br />
                <Table striped>
                    <thead>
                        <tr>
                            <th>Juna</th>
                            <th>Lähtöasema</th>
                            <th>Pääteasema</th>
                            {this.props.arrivals ? <th>Saapuu</th> : <th>Lähtee</th>}
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
                </Table>
            </div>
        );
    }
}

export default TrainDetailsTable;