import React, { Component } from 'react';
import { AllStations } from './ServiceClient';
import Autosuggest from 'react-autosuggest';

export default class StationSearch extends Component {

    constructor() {
        super();
        this.state = {
            allStations: [],
            searchTerm: '',
            suggestions: []
        };
    }

    componentDidMount() {
        AllStations(response => {
            this.setState({ allStations: response.data });
        });
    }

    getSuggestions = searchTerm => {
        const inputValue = searchTerm.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : this.state.allStations.filter(station =>
            station.stationName.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    getSuggestionValue = suggestion => suggestion.stationName;

    renderSuggestion = suggestion => {
        return (
            <div name='station' onClick={() => this.props.changeStation(suggestion)}>{suggestion.stationName} ({suggestion.stationShortCode})</div>)
    };

    onChange = (event, { newValue }) => {
        // this.props.station(newValue);
        this.setState({ searchTerm: newValue });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const { searchTerm, suggestions } = this.state;

        const inputProps = {
            placeholder: 'Esim. "Helsinki"',
            value: searchTerm,
            onChange: this.onChange
        };

        return (
            <div>
                <h3>Etsi asemaa</h3>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                />
            </div>
        );
    }
}