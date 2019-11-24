import React from 'react';
import './App.css';

import { Provider } from 'react-redux';

import CurrentCity from './components/CurrentCity/CurrentCity'
import TrackedCityPanel from "./components/TrackedCityPanel/TrackedCityPanel";
import configureStore from "./components/Store/Store";

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
                    Store.dispatch({
                        type: "updateError",
                        data: {isError: false, errorMsg: ""}
                    });
                    this.setState({currentPosition: position, isGeoAccepted: true, isError: false});
                    console.log(Store.getState());
                },
                (e) => {
                    Store.dispatch({
                        type: "updateError",
                        data: {isError: true, errorMsg: e.message}
                    });
                    this.setState({
                        errorMsg: e.message, isError: true,
                        isGeoAccepted: false
                    });
                    console.log(Store.getState());
                },
                {enableHighAccuracy: false, timeout: 20000, maximumAge: 0}
            );
        } else {
            Store.dispatch({
                type: "updateError",
                data: {isError: true, errorMsg: "Геолокация не поддерживается вашим браузером"}
            });
            this.setState({errorMsg: "Геолокация не поддерживается вашим браузером", isError: true});
            console.log(Store.getState());
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
                    {this.state.isError && <div className="error_msg">{this.state.errorMsg}</div>}
                    {this.state.currentPosition && <CurrentCity currentPosition={this.state.currentPosition}/>}
                    {!this.state.isGeoAccepted && !this.state.currentPosition &&
                    <CurrentCity currentCity={this.state.reserveCity}/>}
                    <TrackedCityPanel/>
                </div>
            </Provider>
        </div>

    )
}

export default App;
