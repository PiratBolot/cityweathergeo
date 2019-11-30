import React from "react";
import './TrackedCity.css';

import {getWeatherByCityName, parseWeatherResponse} from '../../WeatherApi'

import CircularSpinner from "../preLoader/CircularSpinner";
import WeatherProps from "../weatherProps/WeatherProps";
import {connect} from "react-redux";
import {deleteTrackedCity, resetError, setErrorState} from "../../actions/Actions";
import RemoveCityButton from "../removeCityButton/RemoveCityButton";

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
            if (this.props.trackedCities.indexOf(this.props.city) !== -1) {
                this.props.successAddCity();
            }
        } else {
            this.props.failureAddCity(data.status === "404" ? "Город " + this.props.city + " не найден" : "Ошибка API " + data.status);
            this.props.deleteCity(this.props.city);
        }
        let res = data.response;
        let parsedData = parseWeatherResponse(res);

        this.setState({loaded: !!res, data: res, parsedWeather: parsedData, city: res.name});
    }

    render = () => (
        <div className="weather_frame">
            <div className="wf_header">
                <div className="city_name">
                    {this.props.city}
                </div>
                {
                    this.state.data ?
                        <div className="temperature_c">
                            <span>{(this.state.data.main.temp - 273.14).toFixed(1) + "°C"}</span>
                        </div> : ""
                }
                {
                    this.state.data ?
                        <img className="weather_icon" src={"http://openweathermap.org/img/wn/" +
                        this.state.data.weather[0].icon + "@2x.png"} alt=""
                        /> : ""
                }
                <RemoveCityButton city={this.props.city}/>
            </div>
            {
                this.state.loaded ?
                    <WeatherProps parsedWeather={this.state.parsedWeather} />
                    :
                    <div className="image_container_overlay">
                        <p className="label">Подождите, данные загружаются</p>
                        <CircularSpinner />
                    </div>
            }
        </div>
    )
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