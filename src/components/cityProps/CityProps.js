import React from 'react';
import './CityProps.css'
import RemoveCityButton from "./removeCityButton/RemoveCityButton";
import Temperature from "./temperature/Temperature";
import WeatherIcon from "./weatherIcon/WeatherIcon";

class CityProps extends React.Component {
    render() {
        return (
            <div>
                {
                    this.props.isCurrentCity ?
                        <div className="weather_frame_now">
                            <div className="city_name">{this.props.city}</div>
                            <div className="date">{new Date().toDateString()}</div>
                            <div className="weather_now">
                                <Temperature temp={this.props.data.main.temp}/>
                                <WeatherIcon icon={this.props.data.weather[0].icon}/>
                                <div className="weather_description">{this.props.data.weather[0].description}</div>
                            </div>
                        </div>
                        :
                        <div className="weather_now">
                            <div className="city_name">
                                {this.props.city}
                            </div>
                            {
                                this.props.data ?
                                    <Temperature temp={this.props.data.main.temp}/> : ""
                            }
                            {
                                this.props.data ?
                                    <WeatherIcon icon={this.props.data.weather[0].icon}/> : ""
                            }
                            <RemoveCityButton city={this.props.city}/>
                        </div>
                }
            </div>
        )
    }
}

export default CityProps;