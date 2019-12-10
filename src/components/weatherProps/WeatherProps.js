import React from "react";
import './WeatherProps.css'

class WeatherProps extends React.Component {
    render() {
        return (
        <div className="wn_body">
            {
                this.props.parsedWeather.map((e) =>
                    <div key={e.key} className="wn_line">
                        <div className="info_label">{e.key}</div>
                        <div className="info_value">{e.value}</div>
                    </div>
                )
            }
        </div>
        )
    }
}

export default WeatherProps;