import { push } from 'react-router-redux';

export const initiateGame = function(dispatch, typeGame) {
    dispatch({ type: typeGame, data: ""});
    document.getElementById("header").style.display = "none";
    document.getElementById("footer").style.display = "none";
    document.getElementById("GameWindow").style.height = window.innerHeight.toString() + "px";
    dispatch(push("/game"));
}
