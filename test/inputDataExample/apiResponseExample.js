export default function apiResponseExample() {
    return {
        clouds: {all: 90},
        cod: 200,
        coord: {lon: 50.82, lat: 61.67},
        dt: 1576002338,
        id: 485239,
        main: {temp: 276.15, pressure: 1005, humidity: 86, temp_min: 276.15, temp_max: 276.15},
        name: "Syktyvkar",
        sys: {type: 1, id: 9036, country: "RU", sunrise: 1575956612, sunset: 1575976518},
        timezone: 10800,
        visibility: 10000,
        weather: [
            {id: 804, main: "Clouds", description: "пасмурно", icon: "04n"}
        ],
        length: 1,
        wind: {speed: 3, deg: 210}
    }
}