import React from 'react';
import './Loader.css';
import CircularSpinner from "./spinner/CircularSpinner";

class Loader extends React.Component {
    render() {
        return (
            <div className="image_container_overlay">
                <p className="label">Подождите, данные загружаются</p>
                <CircularSpinner/>
            </div>
        )
    }
}

export default Loader;