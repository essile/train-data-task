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

export default function () { }