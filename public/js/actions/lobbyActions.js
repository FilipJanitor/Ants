import { push } from 'react-router-redux';

export const initiateGame = function(dispatch, typeGame) {
    dispatch({ type: typeGame, data: ""});
    dispatch(push("/game"));
}
