import React from 'react';
import './App.css';

import CurrentCity from './components/CurrentCity'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPosition: null,
            isGeoAccepted: true,
            reserveCity: "Syktyvkar",
            isError: false
        };
        this.getGeoData = this.getGeoData.bind(this);
    }

  getGeoData = (e) => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
              (position) => {
                  this.setState({currentPosition: position, isGeoAccepted: true, isError: false});
              },
              (e) => {
                  this.setState({errorMsg: e.message, isError: true,
                      isGeoAccepted: false});
              },
              {enableHighAccuracy: false, timeout: 20000, maximumAge: 0}
          );
      } else {
          this.setState({errorMsg: "Геолокация не поддерживается вашим браузером", error: true});
      }

  };

  componentDidMount = () => {
      this.getGeoData();
  };


  render = () => (
      <div className="App">
        <div className="app_header">
          <div className="app_header_text">Погода здесь</div>
          <button className="app_geo_update_button" onClick={this.getGeoData}>Обновить геолокацию</button>
        </div>
          {this.state.isError && <div className="error_msg">{this.state.errorMsg}</div>}
          {this.state.currentPosition && <CurrentCity currentPosition={this.state.currentPosition} />}
          {!this.state.isGeoAccepted && !this.state.currentPosition  && <CurrentCity currentCity={this.state.reserveCity} />}
      </div>
  )
}

export default App;
