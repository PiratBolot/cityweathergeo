import React from "react";
import {getWeatherByCoords, parseWeatherResponse} from "../../WeatherApi";
import './CurrentCity.css'
import CircularSpinner from "../preLoader/CircularSpinner";
import {connect} from "react-redux";
import {getGeolocation} from "../../actions/Actions";
import WeatherProps from "../weatherProps/WeatherProps";

class CurrentCity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.geolocation.currentPosition &&
            this.props.geolocation.currentPosition !== prevProps.geolocation.currentPosition) {
            let data = await getWeatherByCoords(this.props.geolocation.currentPosition);
            let res = data.response;
            let parsedData = parseWeatherResponse(res);
            this.setState({loaded: !!res, data: res, parsedWeather: parsedData, city: res.name + ", " + res.sys.country});
        }
    }

    componentDidMount() {
        this.props.getLocation();
    }


    render = () => (
        <div className="current_city">
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
                        <CircularSpinner/>
                    </div>
            }
            {
                this.state.parsedWeather ?
                    <WeatherProps parsedWeather={this.state.parsedWeather} /> : ""
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    geolocation: state.geolocation
});

const mapDispatchToProps = (dispatch) => ({
    getLocation: () => dispatch(getGeolocation())
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentCity);