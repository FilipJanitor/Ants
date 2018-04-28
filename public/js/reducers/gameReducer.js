import {
    NOT_LOOKING_FOR_MATCH,
    LOOKING_FOR_NORMAL_MATCH,
    LOOKING_FOR_HARDCORE_MATCH,
    LOOKING_FOR_CORRESPONDENCE_MATCH,
    LOOKING_FOR_HARDCORE_CORRESPONDENCE_MATCH
} from '../constants';

export default function reducer(state, action){
    switch (action.type){//wow such objectspread...
        case LOOKING_FOR_NORMAL_MATCH:
            return { ...state, lookingForGame: action.type };
        case LOOKING_FOR_HARDCORE_MATCH:
            return { ...state, lookingForGame: action.type };
        case LOOKING_FOR_CORRESPONDENCE_MATCH:
            return { ...state, lookingForGame: action.type, correspondenceGame: true };
        case LOOKING_FOR_HARDCORE_CORRESPONDENCE_MATCH:
            return { ...state, lookingForGame: action.type, correspondenceGame: true };
        default: /*Sem este, ked sa ide continuovat hra, ked sa robi tah a podobne */
            console.log("REDUX STATE IS CORRUPTED GAME")
            return state;
    }
}
