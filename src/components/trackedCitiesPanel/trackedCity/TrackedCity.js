import React from "react";
import './TrackedCity.css';

import {getWeatherByCityName, parseWeatherResponse} from '../../../WeatherApi'
import WeatherProps from "../../weatherProps/WeatherProps";
import {connect} from "react-redux";
import {deleteTrackedCity, resetError, setErrorState} from "../../../actions/Actions";
import CityProps from "../../cityProps/CityProps";
import Loader from "../../preLoader/Loader";

class TrackedCity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: props.city,
            loaded: false
        };
    }

    async componentDidMount() {
        let data = await getWeatherByCityName(this.props.city);
        if (data.status === "200") {
            this.props.successAddCity();
            let res = data.response;
            let parsedData = parseWeatherResponse(res);
            this.setState({loaded: true, data: res, parsedWeather: parsedData, city: res.name});
        } else {
            this.setState({loaded: false});
            this.props.failureAddCity(data.status === "404" ? "Город " + this.props.city + " не найден" : "Ошибка API " + data.status);
            this.props.deleteCity(this.props.city);
        }
    }

    render() {
        return (
            <div className="weather_frame">
                <CityProps isCurrentCity={false} city={this.props.city} data={this.state.data}/>
                {
                    this.state.loaded ?
                        <WeatherProps parsedWeather={this.state.parsedWeather}/>
                        :
                        <Loader/>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    trackedCities: state.trackedCities,
});

const mapDispatchToProps = (dispatch) => ({
    deleteCity: (city) => dispatch(deleteTrackedCity(city)),
    successAddCity: () => dispatch(resetError()),
    failureAddCity: (msg) => dispatch(setErrorState(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackedCity);