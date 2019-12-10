import React from 'react'
import './RemoveCityButton.css';
import {deleteTrackedCity} from "../../../actions/Actions";
import {connect} from "react-redux";

class RemoveCityButton extends React.Component {
    constructor(props) {
        super(props);
        this.removeTrackedCity = this.removeTrackedCity.bind(this);
    }

    async removeTrackedCity(e) {
        e.preventDefault();
        this.props.deleteCity(this.props.city);
    };

    render() {
        return (
            <button className="remove_city_button" onClick={this.removeTrackedCity}>X</button>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    deleteCity: (city) => dispatch(deleteTrackedCity(city))
});

export default connect(null, mapDispatchToProps)(RemoveCityButton);