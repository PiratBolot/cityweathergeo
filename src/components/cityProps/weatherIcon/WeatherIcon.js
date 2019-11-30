import React from 'react';
import './WeatherIcon.css';

class WeatherIcon extends React.Component {
    render = () => (
        <img className="weather_icon" src={"http://openweathermap.org/img/wn/" +
        this.props.icon + "@2x.png"} alt=""
        />
    )
}

export default WeatherIcon;