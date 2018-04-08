const initialState = {
    name: "",
    password: "",
    failedLogin: false
};
//toto je pre redux
//You either need to provide it as the second argument to createStore(reducer, preloadedState),
//or have your reducers handle an undefined state argument and return the initial state.
export default function reducer(state = initialState, action){
    switch (action.type){//wow such objectspread...
        case "SET_NAME":
            return { ...state, name: action.data };
        case "SET_PASSWORD":
            return { ...state, password: action.data };
        case "LOGOUT":
            return  { ...initialState };
        default:
            return state;
    }
}
