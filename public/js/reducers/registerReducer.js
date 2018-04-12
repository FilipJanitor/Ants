const initialState = {
    regName: "",
    regPassword: "",
    failedRegister: false
};

export default function reducer(state = initialState, action){
    switch (action.type){//wow such objectspread...
        case "SET_REG_NAME":
            return { ...state, regName: action.data };
        case "SET_REG_PASSWORD":
            return { ...state, regPassword: action.data };
        case "REGISTER":
            return  { ...initialState };
        case "REGISTER_FAIL":
            return { ...state, failedRegister: true};
        case "REGISTER":
            return {
                ...state,
                failedRegister: flase,
                userId: action.data.userId,
                token: action.data.token,
                regName: action.data.name,
                regPassword: action.data.password,
                name: action.data.name,
                password: action.data.password
            };
        default:
            return state;
    }
}