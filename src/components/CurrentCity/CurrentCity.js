import React from "react";
import {getWeatherByCoords, getWeatherByCityName, parseWeatherResponse} from "../../WeatherApi";
import './CurrentCity.css'
import CircularSpinner from "../PreLoader/CircularSpinner";

class CurrentCity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPosition: props.currentPosition,
            currentCity: props.currentCity,
            loaded: false
        };
    }

    async componentDidMount() {
        let data;
        if (this.state.currentCity) {
            data = await getWeatherByCityName(this.state.currentCity);
        } else {
            data = await getWeatherByCoords(this.state.currentPosition.coords);
        }
        let res = data.response;
        let parsedData = parseWeatherResponse(res);

        /* Uncomment if you want to see the preLoader explicitly
        var answer = prompt('question', 'defaultAnswer');
        */

        this.setState({loaded: !!res, data: res, parsedWeather: parsedData, city: res.name + ", " + res.sys.country});
    }


    render = () => (
        <div className="weather_frame">
            {
                this.state.loaded ?
                <div className="weather_frame_now">
                    <div className="city_name">{this.state.city}</div>
                    <div className="date">{new Date().toDateString()}</div>
                    <div className="weather_now">
                        <div className="temperature_c">
                            <span>{(this.state.data.main.temp - 273.14).toFixed(1) + "°C"}</span>
                        </div>
                        <img className="weather_icon" src={"http://openweathermap.org/img/wn/" +
                        this.state.data.weather[0].icon + "@2x.png"} alt=""
                        />
                        <div className="weather_description">{this.state.data.weather[0].description}</div>
                    </div>
                </div>
                    :
                    <div className="image_container_overlay">
                        <p className="label">Подождите, данные загружаются</p>
                        <CircularSpinner />
                    </div>
            }
            {
                this.state.parsedWeather ?
                    <div className="wn_body">
                        {
                            this.state.parsedWeather.map((e) =>
                                <div key={e.key} className="wn_line">
                                    <div className="info_label">{e.key}</div>
                                    <div className="info_value">{e.value}</div>
                                </div>
                            )
                        }
                    </div> : ""
            }
        </div>
    )
}

export default CurrentCity;