import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Container } from 'reactstrap';
import classnames from 'classnames';

import StationSearch from './StationSearch';
import TrainDetailsTable from './TrainDetailsTable';
import { StationArrivalsAndDepartures, AllStations } from './ServiceClient';

class App extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      station: '',
      allStations: [],
      arrivingTrains: [],
      departingTrains: [],
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
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

      }
      return null;
    });
    return trainStops;
  }

  render() {

    return (
      <Container>
        <StationSearch changeStation={this.changeStation} />
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              <span className={this.state.activeTab === '1' ? 'activeTab' : 'nonActiveTab'}>Saapuvat</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              <span className={this.state.activeTab === '2' ? 'activeTab' : 'nonActiveTab'}>Lähtevät</span>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                {this.state.arrivingTrains.length > 0 &&
                  <TrainDetailsTable
                    trains={this.state.arrivingTrains}
                    station={this.state.station}
                    arrivals={true}
                    allStations={this.state.allStations}
                  />}
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                {this.state.departingTrains.length > 0 &&
                  <TrainDetailsTable
                    trains={this.state.departingTrains}
                    station={this.state.station}
                    arrivals={false}
                    allStations={this.state.allStations}
                  />}
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </Container>
    );
  }
}

export default App;
