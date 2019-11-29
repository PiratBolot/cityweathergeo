import React from 'react';
import './TrackedCitiesPanel.css';

import {addTrackedCity, setErrorState, resetError} from "../../actions/Actions";
import {getWeatherByCityName} from "../../WeatherApi";
import TrackedCity from "../trackedCity/TrackedCity";
import {connect} from "react-redux";


class TrackedCitiesPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
        };

        this.addCityHandler = this.addCityHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        this.setState({city: e.target.value});
    };

    addCityHandler = async (e) => {
        e.preventDefault();
        await this.addTrackedCity(this.state.city);
        this.setState({city: ''});
    };

    addTrackedCity = async (city) => {
        if (city === "") {
            this.props.failureAddCity("Пустой запрос");
            return false;
        }
        // TODO: Добавляем город в избранное, лоадер показывается сразу
        // TODO: Загружаем данные города 1 раз
        // TODO: 2 раза запрашиваем данные города (здесь и в TrackedCity)
        let data = await getWeatherByCityName(city);
        if (data.status === "200") {
            if (this.props.addFavoriteCity(data.response.name)) {
                this.props.successAddCity();
                return true;
            } else {
                this.props.failureAddCity("Город " + city + " уже отслеживается");
            }
        } else {
            this.props.failureAddCity(data.status === "404" ? "Город " + city + " не найден" : "Ошибка API " + data.status);
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
                    this.props.trackedCities &&
                    this.props.trackedCities.map(
                        (e) => <TrackedCity key={e} city={e}/>
                    )
                }
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    trackedCities: state.trackedCities,
    errorMessage: state.errorMessage
});

const mapDispatchToProps = (dispatch) => ({
    addFavoriteCity: (cityName) => dispatch(addTrackedCity(cityName)),
    successAddCity: () => dispatch(resetError()),
    failureAddCity: (msg) => dispatch(setErrorState(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackedCitiesPanel);