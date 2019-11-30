import React from 'react';
import './Temperature.css';

class Temperature extends React.Component {
    render = () => (
        <div className="temperature_c">
            <span>{(this.props.temp - 273.14).toFixed(1) + "°C"}</span>
        </div>
    )
}

export default Temperature;