const initialState = {
    name: "",
    password: "",
    failed: false,
    userId: -1,
    token: ""
};

export default function reducer(state, action){
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
            return state;
    }
}
