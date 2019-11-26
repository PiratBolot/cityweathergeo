import React from 'react';

class HeaderMenu extends React.Component {
    render = () => (
        <div className="app_header">
            <div className="app_header_text">Погода здесь</div>
            <button className="app_geo_update_button" onClick={this.getGeoData}>Обновить геолокацию</button>
        </div>
    )
}