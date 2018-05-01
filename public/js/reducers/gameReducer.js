import {
    NOT_LOOKING_FOR_MATCH,
    LOOKING_FOR_NORMAL_MATCH,
    LOOKING_FOR_HARDCORE_MATCH,
    LOOKING_FOR_CORRESPONDENCE_MATCH,
    LOOKING_FOR_HARDCORE_CORRESPONDENCE_MATCH,
    NEW_GAME_STATE
} from '../constants';

export default function reducer(state, action){
    switch (action.type){// beware the mighty shallow copy
        case LOOKING_FOR_NORMAL_MATCH:
            return { ...state, lookingForGame: action.type };
        case LOOKING_FOR_HARDCORE_MATCH:
            return { ...state, lookingForGame: action.type };
        case LOOKING_FOR_CORRESPONDENCE_MATCH:
            return { ...state, lookingForGame: action.type, correspondenceGame: true };
        case LOOKING_FOR_HARDCORE_CORRESPONDENCE_MATCH:
            return { ...state, lookingForGame: action.type, correspondenceGame: true };
        case NEW_GAME_STATE: //tymto ten deepcopy oplachenme
            return { ...state,
                opponentName: action.data.opponentName,
                playerStats: action.data.playerStats,
                opponentStats: action.data.opponentStats,
                onTurn: action.data.onTurn,
                playedCard: action.data.playedCard,
                cards: action.data.cards,
                running: true
            };
        default: /*Sem este, ked sa ide continuovat hra, ked sa robi tah a podobne */
            // console.log("REDUX STATE IS CORRUPTED GAME")
            return state;
    }
}
