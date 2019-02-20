import React, { Component } from 'react';
import StationSearch from './StationSearch';
import TrainDetailsTable from './TrainDetailsTable';
import { StationArrivalsAndDepartures, AllStations } from './ServiceClient';

class App extends Component {

  state = {
    station: '',
    allStations: [],
    arrivingTrains: [],
    departingTrains: [],
  }

  componentDidMount() {
    this.fetchAllStations(response => {
      this.setState({ allStations: response });
    });
  }

  fetchAllStations = (callback) => {
    AllStations(response => {
      callback(response.data);
    });
  }

  changeStation = (station) => {
    this.getStationTrains(station.stationShortCode)
    this.setState({ station: station.stationShortCode });
  }

  getStationTrains = (stationShortCode) => {
    StationArrivalsAndDepartures(stationShortCode, response => {

      const arrivingTrains = [];
      const departingTrains = [];

      response.data.map(train => {
        // filterDataNeededOnly returns an array because the same train might stop in the same station twice (f.ex. P in Pasila)
        const possibleDoubleTrain = this.filterDataNeededOnly(train);

        possibleDoubleTrain.map(train => {
          if (train.type === 'ARRIVAL') {
            arrivingTrains.push(train);
          } else if (train.type === 'DEPARTURE') {
            departingTrains.push(train);
          }
          return null;
        });
        return null;
      })
      this.setState({ arrivingTrains, departingTrains });
    })
  }

  filterDataNeededOnly = (train) => {

    const trainStops = [];
    const stations = train.timeTableRows;

    let trainDetails = {
      cancelled: train.cancelled,
      commuterLineID: train.commuterLineID,
      trainType: train.trainType,
      trainNumber: train.trainNumber,
      type: '',
      scheduledTime: '',
      liveEstimateTime: '',
      departureStation: stations[0].stationShortCode,
      arrivalStation: stations[stations.length - 1].stationShortCode
    }

    stations.map(stop => {
      if (stop.stationShortCode === this.state.station) {

        trainDetails.scheduledTime = stop.scheduledTime;
        trainDetails.liveEstimateTime = stop.liveEstimateTime;
        trainDetails.type = stop.type;
        const copyOfTrain = { ...trainDetails };
        trainStops.push(copyOfTrain);

        return null;
      }
    });
    return trainStops;
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <StationSearch changeStation={this.changeStation} />

        {this.state.arrivingTrains.length > 0 &&
          <TrainDetailsTable
            trains={this.state.arrivingTrains}
            station={this.state.station}
            arrivals={true}
            allStations={this.state.allStations}
          />}

        {this.state.departingTrains.length > 0 &&
          <TrainDetailsTable
            trains={this.state.departingTrains}
            station={this.state.station}
            arrivals={false}
            allStations={this.state.allStations}
          />}
      </div>
    );
  }
}

export default App;
