const API_KEY = "5c421a898af8f8f0d9a04eb07a32545d";

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
            return {status: response.status, response: json};
        }
    )
);

const getWeatherByCityName = async (city) => (
    toJson(
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API_KEY + "&lang=ru")
    )
);

const getWeatherByCoords = async (coords) => (
    toJson(
        fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=" + coords.latitude
        + "&lon=" + coords.longitude + "&appid=" + API_KEY + "&lang=ru"
        )
    )
);

export {getWeatherByCityName, getWeatherByCoords};