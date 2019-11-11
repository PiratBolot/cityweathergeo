import React from 'react';
import './App.css';

import CurrentCity from './components/CurrentCity'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPosition: null
        };
    }

  updateGeo = (e) => navigator.geolocation.getCurrentPosition(
      (position) => {
          this.setState({currentPosition: position})
      },
      (e) => {
          this.setState({error: "Невозможно определить местонахождение"})
      }
  );

  componentDidMount = () => {
      this.updateGeo();
  };


  render = () => (
      <div className="App">
        <div className="app_header">
          <div className="app_header_text">Погода здесь</div>
          <button className="app_geo_update_button" onClick={this.updateGeo}>Обновить геолокацию</button>
        </div>
          {this.state.currentPosition && <CurrentCity currentPosition={this.state.currentPosition} />}
      </div>
  )
}

export default App;
