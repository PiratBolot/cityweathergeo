import React from "react";
import {getWeatherByCoords, parseWeatherResponse} from "../../WeatherApi";
import './CurrentCity.css'
import {connect} from "react-redux";
import {getGeolocation} from "../../actions/Actions";
import WeatherProps from "../weatherProps/WeatherProps";
import CityProps from "../cityProps/CityProps";
import Loader from "../preLoader/Loader";

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

            this.setState({
                loaded: !!res,
                data: res,
                parsedWeather: parsedData,
                city: res.name + ", " + res.sys.country
            });
        }
    }

    componentDidMount() {
        this.props.getLocation();
    }


    render() {
        return (
            <div className="current_city">
                {
                    this.state.loaded ?
                        <CityProps isCurrentCity={true} city={this.state.city} data={this.state.data}/>
                        :
                        <Loader/>
                }
                {
                    this.state.parsedWeather ?
                        <WeatherProps parsedWeather={this.state.parsedWeather}/> : ""
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    geolocation: state.geolocation
});

const mapDispatchToProps = (dispatch) => ({
    getLocation: () => dispatch(getGeolocation())
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentCity);