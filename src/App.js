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
    this.getStationArrivals(station.stationShortCode)
    this.setState({ station: station.stationShortCode });
  }

  getStationArrivals = (stationShortCode) => {
    StationArrivals(stationShortCode, response => {
      const arrivingTrains = [];
      response.data.map(arrivingTrain => {
        // filterDataNeededOnly returns an array because the same train might stop in the same station twice (f.ex. P in Pasila)
        const possibleDoubleTrain = this.filterDataNeededOnly(arrivingTrain);
        possibleDoubleTrain.map(train => {
          arrivingTrains.push(train);
          return null;
        });
        return null;
      })
      this.setState({ arrivingTrains });
    })
  }

  filterDataNeededOnly = (train) => {

    const trainStops = [];

    let scheduledTime = '';
    let liveEstimateTime = '';
    const stations = train.timeTableRows;
    const departureStation = stations[0].stationShortCode;
    const arrivalStation = stations[stations.length - 1].stationShortCode;

    let trainDetails = {
      cancelled: train.cancelled,
      commuterLineID: train.commuterLineID,
      trainType: train.trainType,
      trainNumber: train.trainNumber,
      scheduledTime,
      liveEstimateTime,
      departureStation,
      arrivalStation
    }

    train.timeTableRows.map(stop => {
      if (stop.stationShortCode === this.state.station && stop.type === 'ARRIVAL') {
        trainDetails.scheduledTime = stop.scheduledTime;
        trainDetails.liveEstimateTime = stop.liveEstimateTime
        const copyOfTrain = { ...trainDetails };
        trainStops.push(copyOfTrain);
      }
      return null;
    });
    return trainStops;
  }

  render() {
    return (
      <div>
        <StationSearch changeStation={this.changeStation} />
        {this.state.arrivingTrains.length > 0 && <ArrivingTrains arrivingTrains={this.state.arrivingTrains} station={this.state.station} />}
      </div>
    );
  }
}

export default App;
