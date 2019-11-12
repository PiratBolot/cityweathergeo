export const CityReducer = (state = [], action) => {
    switch (action.type) {
        case "addCity":
            return state.concat([action.data]);
        case "deleteCity":
            return state.filter(el => el !== action.data);
        default:
            return state;
    }
};