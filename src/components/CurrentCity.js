import React from "react";
import {getWeatherByCoords, parseWeatherResponse} from "../WeatherApi";
import './CurrentCity.css'

class CurrentCity extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentPosition: props.currentPosition };
    }

    async componentDidMount() {
        let data = await getWeatherByCoords(this.state.currentPosition.coords);
        let res = data.response;
        // console.log(res);
        // console.log(res.name);
        let parsedData = parseWeatherResponse(res);
        this.setState({data: res, parsedWeather: parsedData, city: res.name + ", " + res.sys.country});
        // console.log(this.state.data.weather[0].icon);
    }


    render = () => (
        <div className="weather_frame">
            {
                this.state.data &&
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