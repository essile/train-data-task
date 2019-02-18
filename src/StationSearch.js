import React, { Component } from 'react';
import { AllStations } from './ServiceClient';


class StationSearch extends Component {

    componentDidMount() {
        AllStations(response => {
            console.log(response);
        })
    }

    render() {
        return (
            <div>
                STATION SEARCH
            </div>
        );
    }
}

export default StationSearch;