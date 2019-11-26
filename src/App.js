import React from 'react';
import './App.css';

import {setErrorState, setSuccessState} from "./actions/Actions";

import {Provider} from 'react-redux';

import CurrentCity from './components/currentCity/CurrentCity'
import TrackedCityPanel from "./components/trackedCityPanel/TrackedCityPanel";
import configureStore from "./store/Store";
import ErrorLine from "./components/errorLine/ErrorLine";

const store = configureStore();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPosition: null,
            isGeoAccepted: true,
            reserveCity: "Syktyvkar",
            isError: false
        };
        this.getGeoData = this.getGeoData.bind(this);
    }

    getGeoData = (e) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setSuccessState();
                    this.setState({currentPosition: position, isGeoAccepted: true, isError: false});
                },
                (e) => {
                    setErrorState(e.message)
                    this.setState({
                        errorMsg: e.message, isError: true,
                        isGeoAccepted: false
                    });
                },
                {enableHighAccuracy: false, timeout: 20000, maximumAge: 0}
            );
        } else {
            setErrorState("Геолокация не поддерживается вашим браузером");
        }

    };

    componentDidMount = () => {
        this.getGeoData();
    };

    render = () => (
        <div>
            <Provider store={store}>
                <div className="App">
                    <div className="app_header">
                        <div className="app_header_text">Погода здесь</div>
                        <button className="app_geo_update_button" onClick={this.getGeoData}>Обновить геолокацию</button>
                    </div>
                    <ErrorLine />
                    {this.state.currentPosition && <CurrentCity currentPosition={this.state.currentPosition}/>}
                    {!this.state.isGeoAccepted && !this.state.currentPosition &&
                    <CurrentCity currentCity={this.state.reserveCity}/>}
                    <TrackedCityPanel />
                </div>
            </Provider>
        </div>

    )
}

export default App;
