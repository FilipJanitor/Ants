const initialState = {
    name: "",
    password: "",
    failed: false,
    userId: -1,
    token: ""
};
//toto je pre redux
//You either need to provide it as the second argument to createStore(reducer, preloadedState),
//or have your reducers handle an undefined state argument and return the initial state.
export default function reducer(state /*= initialState*/, action){
    switch (action.type){//wow such objectspread...
        case "SET_NAME":
            return { ...state, name: action.data };
        case "SET_PASSWORD":
            return { ...state, password: action.data };
        case "LOGOUT":
            return { ...initialState };
        case "FAIL":
            return { ...state, failed: true};
        case "LOGIN":
            return {
                ...state,
                auth: true,
                failed: false,
                userId: action.data.userId,
                token: action.data.token,
                name: action.data.name,
                password: ""
            };
        case "LOGIN_TO_REGISTER":
            return {
                ...state,
                name: "",
                password: "",
                failed: false
            }
        case "REGISTER_TO_LOGIN":
            return {
                ...state,
                name: "",
                password: "",
                failed: false
            }
        default:
            console.log("REDUX STATE IS CORRUPTED");
            console.log(state);
            return state;
    }
}
