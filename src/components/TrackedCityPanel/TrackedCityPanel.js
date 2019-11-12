import React from 'react';
import './TrackedCityPanel.css';

import Store from "../Store/Store";

import {getWeatherByCityName} from "../../WeatherApi";
import TrackedCity from "../TrackedCity/TrackedCity";

class TrackedCityPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            trackedCities: null
        };

        this.state.trackedCities = Store.getState();
        Store.subscribe(() => {
            this.setState({trackedCities: Store.getState()})
        });

        this.addCityHandler = this.addCityHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        this.setState({city: e.target.value});
    };

    addCityHandler = async (e) => {
        e.preventDefault();
        await this.addTrackedCity(this.state.city);
        this.setState({city: ""});
    };

    addTrackedCity = async (city) => {
        if (city === "") {
            // Глобально
            Store.dispatch({
                type: "updateError",
                data: {isError: true, errorMsg: "Пустой запрос"}
            });
            return false;
        }

        let data = await getWeatherByCityName(city);
        if (data.status === "200") {
            if (this.state.trackedCities.indexOf(data.response.name) === -1) {
                Store.dispatch({
                    type: "addCity",
                    data: data.response.name
                });
                Store.dispatch({
                    type: "updateError",
                    data: {isError: false, errorMsg: ""}
                });
                console.log(Store.getState());
                return true;
            } else {
                Store.dispatch({
                    type: "updateError",
                    data: {isError: true, errorMsg: "Город " + data.response.name + " уже отслеживается"}
                });
                console.log(Store.getState());
            }
        } else {
            Store.dispatch({
                type: "updateError",
                data: {isError: true, errorMsg:
                        data.status === "404" ? "Город " + city + " не найден" : "Ошибка API " + data.status
                }

            });
            console.log(Store.getState());
        }
        return false;
    };

    render = () => (
        <div className="tracked_city">
            <div className="tracked_city_panel">
                <div className="panel_text">Избранное</div>
                <form className="add_form" onSubmit={this.addCityHandler}>
                    <input type="text" value={this.state.city} className="add_field"
                           onChange={this.handleChange} placeholder="Добавить новый город"/>
                    <input type="submit" className="add_button" value="+"/>
                </form>
            </div>
            <div className="tracked_city_list">
                {
                    this.state.trackedCities &&
                    this.state.trackedCities.map(
                        (e) => <TrackedCity key={e} city={e}/>
                    )
                }
            </div>
        </div>
    );
}

export default TrackedCityPanel;