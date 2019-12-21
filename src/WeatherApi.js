const COMPASS_POINTS = ["Северный", "С-С-В", "Северо-Восточный", "В-С-В", "Восточный", "В-Ю-В", "Юго-Восточный",
    "Ю-Ю-В", "Южный", "Ю-Ю-З", "Юго-Западный", "З-Ю-З", "Западный", "З-С-З", "Северо-Западный", "С-С-З"];

const toJson = (promise) => (
    promise.then(
        (response) => {
            return response;
        },
        (e) => {
            console.log("Получили битые данные");
        }
    ).then(
        async (response) => {
            let json = await response.json();
            console.log(json);
            return {status: json.cod.toString(), response: json};
        }
    )
);

const getWeatherByCityName = async (city) => (
    toJson(
        fetch("http://localhost:3001/weather?city=" + city)
    )
);

const getWeatherByCoords = async (coords) => (
    toJson(
        fetch("http://localhost:3001/weather/coordinates?lat=" + coords.latitude + "&lon=" + coords.longitude)
    )
);

const degToCompass = (num) => {
    let val = Math.floor((num / 22.5) + 0.5);
    return COMPASS_POINTS[(val % 16)];
};

const parseWeatherResponse = (res) => (
    [
        {key: "Ветер", value: res.wind.speed + " м/с, " + degToCompass(res.wind.deg)},
        {key: "Давление", value: res.main.pressure + " hPa"},
        {key: "Влажность", value: res.main.humidity + " %"},
        {key: "Координаты", value: "[" + res.coord.lat + ", " + res.coord.lon + "]"}
    ]
);

export {getWeatherByCityName, getWeatherByCoords, parseWeatherResponse};