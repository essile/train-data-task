import Axios from 'axios';

const API = 'https://rata.digitraffic.fi/api'

export function AllStations(callback) {
  Axios.get(API + "/v1/metadata/stations")
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
}

export function StationArrivals(stationShortCode, callback) {
  console.log('koodi', stationShortCode)
  Axios.get(API + `/v1/live-trains?arrived_trains=0&arriving_trains=20&departed_trains=0&departing_trains=0&station=${stationShortCode}&include_nonstopping=false`)
    .then(response => {
      console.log('toimii, data', response.data)
      callback(response);
    })
    .catch(error => {
      console.log('ei toimi')
      callback(error);
    });
}
export default function () { }