const initialState = {
    regName: "",
    regPassword: "",
    failedRegister: false
};

export default function reducer(state = initialState, action){
    switch (action.type){//wow such objectspread...
        case "SET_REG_NAME":
            return { ...state, name: action.data };
        case "SET_REG_PASSWORD":
            return { ...state, password: action.data };
        case "REGISTER":
            return  { ...initialState };
        default:
            return state;
    }
}