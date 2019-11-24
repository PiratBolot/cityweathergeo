import Immutable from 'seamless-immutable';

const initialState = Immutable({
    isError: false,
    errorMsg: ""
});

export default function ErrorReducer(state = initialState, action = {}) {
    switch (action.type) {
        case "updateError":
            // console.log("Мы в ErrorReducer");
            // console.log(this.state.isError);
            return state;
        default:
            return state;
    }
}