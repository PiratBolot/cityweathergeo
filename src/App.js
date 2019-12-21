import React from 'react';
import './App.css';

import {Provider} from 'react-redux';

import CurrentCity from './components/currentCity/CurrentCity'
import TrackedCitiesPanel from "./components/trackedCitiesPanel/TrackedCitiesPanel";
import configureStore from "./store/Store";
import {fetchFavouriteCities, serverFetchFavouriteCities} from "./actions/Actions";
import ErrorLine from "./components/errorLine/ErrorLine";
import HeaderMenu from "./components/headerMenu/HeaderMenu";

const store = configureStore();

class App extends React.Component {

    async componentWillMount() {
        const res = await store.dispatch(serverFetchFavouriteCities);
        store.dispatch(fetchFavouriteCities(res));
    }

    render() {
        return (
            <div>
                <Provider store={store}>
                    <div className="App">
                        <HeaderMenu/>
                        <ErrorLine/>
                        <CurrentCity/>
                        <TrackedCitiesPanel/>
                    </div>
                </Provider>
            </div>
        )
    }
}

export default App;
