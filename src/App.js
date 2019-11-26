import React from 'react';
import './App.css';

import {Provider} from 'react-redux';

import CurrentCity from './components/currentCity/CurrentCity'
import TrackedCitiesPanel from "./components/trackedCitiesPanel/TrackedCitiesPanel";
import configureStore from "./store/Store";
import ErrorLine from "./components/errorLine/ErrorLine";
import HeaderMenu from "./components/headerMenu/HeaderMenu";

const store = configureStore();

class App extends React.Component {
    render = () => (
        <div>
            <Provider store={store}>
                <div className="App">
                    <HeaderMenu />
                    <ErrorLine />
                    <CurrentCity />
                    <TrackedCitiesPanel />
                </div>
            </Provider>
        </div>

    )
}

export default App;
