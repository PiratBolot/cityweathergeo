import React from 'react';
import './HeaderMenu.css'

import {getGeolocation} from "../../actions/Actions";
import {connect} from "react-redux";

class HeaderMenu extends React.Component {
    render = () => (
        <div className="app_header">
            <div className="app_header_text">Погода здесь</div>
            <button className="app_geo_update_button" onClick={this.props.getLocation}>Обновить геолокацию</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    geolocation: state.currentPosition
});

const mapDispatchToProps = (dispatch) => ({
    getLocation: () => dispatch(getGeolocation())
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu);