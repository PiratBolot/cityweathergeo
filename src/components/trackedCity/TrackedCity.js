import React from "react";
import './TrackedCity.css';

import {getWeatherByCityName, parseWeatherResponse} from '../../WeatherApi'

import CircularSpinner from "../preLoader/CircularSpinner";
import {connect} from "react-redux";
import {deleteTrackedCity} from "../../actions/Actions";

class TrackedCity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: props.city,
            loaded: false
        };

        this.removeTrackedCity = this.removeTrackedCity.bind(this);
    }

    async componentDidMount() {
        let data = await getWeatherByCityName(this.props.city);
        let res = data.response;
        let parsedData = parseWeatherResponse(res);

        /* Uncomment if you want to see the preLoader explicitly
        var answer = prompt('question', 'defaultAnswer');
        */

        this.setState({loaded: !!res, data: res, parsedWeather: parsedData, city: res.name});
    }

    removeTrackedCity = async (e) => {
        e.preventDefault();
        this.props.deleteFavCity(this.state.city);
    };

    render = () => (
        <div className="weather_frame">
            <div className="wf_header">
                <div className="city_name">
                    {this.state.city}
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
                        this.state.data.weather[0].icon + ".png"} alt=""
                        /> : ""
                }
                <button className="remove_city_button" onClick={this.removeTrackedCity}>X</button>
            </div>
            {
                this.state.loaded ?
                    <div className="wn_body">
                        {
                            this.state.parsedWeather.map((e) =>
                                <div key={e.key} className="wn_line">
                                    <div className="info_label">{e.key}</div>
                                    <div className="info_value">{e.value}</div>
                                </div>
                            )
                        }
                    </div>
                    :
                    <div className="image_container_overlay">
                        <p className="label">Подождите, данные загружаются</p>
                        <CircularSpinner />
                    </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    deleteFavCity: (city) => dispatch(deleteTrackedCity(city))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackedCity);