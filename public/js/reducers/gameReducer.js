import {
    NOT_LOOKING_FOR_MATCH,
    LOOKING_FOR_NORMAL_MATCH,
    LOOKING_FOR_HARDCORE_MATCH,
    LOOKING_FOR_CORRESPONDENCE_MATCH,
    LOOKING_FOR_HARDCORE_CORRESPONDENCE_MATCH,
    NEW_GAME_STATE,
    NEXT_TURN,
    YOU_WON,
    YOU_LOST,
    TIE,
    DISCARD,
    initialGlobalState
} from '../constants';

export default function reducer(state, action){
    let copyOFInitial = {};
    switch (action.type){// beware the mighty shallow copy
        case LOOKING_FOR_NORMAL_MATCH:
            return { ...state, lookingForGame: action.type, ended: false, won: false };
        case LOOKING_FOR_HARDCORE_MATCH:
            return { ...state, lookingForGame: action.type, ended: false, won: false };
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
        case NEXT_TURN:
            return { ...state,
                onTurn: false
            };
        case YOU_WON:
            copyOFInitial = JSON.parse(JSON.stringify(initialGlobalState.appState));
            return { ...state,
                opponentName: copyOFInitial.opponentName,
                playerStats: copyOFInitial.playerStats,
                opponentStats: copyOFInitial.opponentStats,
                onTurn: copyOFInitial.onTurn,
                playedCard: copyOFInitial.playedCard,
                cards: copyOFInitial.cards,
                running: copyOFInitial.running,
                ended: true,
                won: true,
                tie: false
            };
        case YOU_LOST:
            copyOFInitial = JSON.parse(JSON.stringify(initialGlobalState.appState));
            return { ...state,
                opponentName: copyOFInitial.opponentName,
                playerStats: copyOFInitial.playerStats,
                opponentStats: copyOFInitial.opponentStats,
                onTurn: copyOFInitial.onTurn,
                playedCard: copyOFInitial.playedCard,
                cards: copyOFInitial.cards,
                running: copyOFInitial.running,
                ended: true,
                won: false,
                tie: false
            };
        case DISCARD:
            copyOFInitial = JSON.parse(JSON.stringify(initialGlobalState.appState));
            console.log(copyOFInitial);
            return { ...state,
                opponentName: copyOFInitial.opponentName,
                playerStats: copyOFInitial.playerStats,
                opponentStats: copyOFInitial.opponentStats,
                onTurn: copyOFInitial.onTurn,
                playedCard: copyOFInitial.playedCard,
                cards: copyOFInitial.cards,
                running: copyOFInitial.running,
                ended: copyOFInitial.ended,
                won: copyOFInitial.won,
                tie: false
            };
        case TIE:
            copyOFInitial = JSON.parse(JSON.stringify(initialGlobalState.appState));
            return { ...state,
                opponentName: copyOFInitial.opponentName,
                playerStats: copyOFInitial.playerStats,
                opponentStats: copyOFInitial.opponentStats,
                onTurn: copyOFInitial.onTurn,
                playedCard: copyOFInitial.playedCard,
                cards: copyOFInitial.cards,
                running: copyOFInitial.running,
                ended: copyOFInitial.ended,
                won: copyOFInitial.won,
                ended: true,
                won: false,
                tie: true
            };
        default:
            return state;
    }
}
