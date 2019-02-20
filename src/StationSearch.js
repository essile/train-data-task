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
            placeholder: `Esim. 'Helsinki'`,
            value: searchTerm,
            onChange: this.onChange
        };

        return (
            <div>
                <h5>Hae aseman nimellä</h5>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                    theme={theme}
                />
                <br /><br />
            </div>
        );
    }
}

const theme = {
    container: {
        position: 'relative'
    },
    input: {
        width: 400,
        // height: 30,
        padding: '10px 20px',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 300,
        fontSize: 16,
        border: '1px solid #aaa',
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
        backgroundColor: '#E0F8E0'
    },
    inputFocused: {
        outline: 'none'
    },
    inputOpen: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    suggestionsContainer: {
        display: 'none'
    },
    suggestionsContainerOpen: {
        display: 'block',
        position: 'absolute',
        top: 51,
        width: 400,
        border: '1px solid #aaa',
        backgroundColor: '#fff',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 300,
        fontSize: 16,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        zIndex: 2
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    suggestion: {
        cursor: 'pointer',
        padding: '10px 20px'
    },
    suggestionHighlighted: {
        backgroundColor: '#ddd'
    }
}