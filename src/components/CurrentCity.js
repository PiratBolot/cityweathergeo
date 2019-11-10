import React from "react";
import {getWeatherByCoords} from "../ApiHelper";

class CurrentCity extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentPosition: props.currentPosition };
    }

    async componentDidMount() {
        let data = await getWeatherByCoords(this.state.currentPosition.coords);
        let res = data.response;
        //let parsedData = parseData(res);
        this.setState({data: res, city: res.name + ", " + res.sys.country});
    }


    render = () => (
        <div className="CurrentCity">

            <div className="CityName">{this.state.city}</div>
        </div>
    )
}

export default CurrentCity;