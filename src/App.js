import React, { Component } from 'react';
import StationSearch from './StationSearch';
import ArrivingTrains from './ArrivingTrains';
import { StationArrivals } from './ServiceClient';

class App extends Component {

  state = {
    station: '',
    arrivingTrains: [],
    departingTrains: [],
  }

  changeStation = (station) => {
    console.log('in parent, station', station);
    this.getStationArrivals(station.stationShortCode)
    this.setState({ station: station.stationShortCode });
  }

  getStationArrivals = (stationShortCode) => {
    StationArrivals(stationShortCode, response => {
      console.log('takas', response)
      this.setState({ arrivingTrains: response.data })
    })
  }

  render() {
    console.log('rendering data for station', this.state.arrivingTrains.length)
    return (
      <div>
        <StationSearch changeStation={this.changeStation} />
        {this.state.arrivingTrains.length > 0 && <ArrivingTrains arrivingTrains={this.state.arrivingTrains} station={this.state.station} />}
      </div>
    );
  }
}

export default App;
