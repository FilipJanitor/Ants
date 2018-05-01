/* predstava
+---+---------------+---+
|Sta|               |Sta|
|ts1|               |ts2|
|---+   Game pics   +---+
|   |               |   |
|---+               +---+
|---+-+-+-+-+-+-+-+-+---+
|   |1|2|3|4|5|6|7|8|   |
|   | | | | | | | | |   |
+---+-+-+-+-+-+-+-+-+---+
*/

//da sa to zlozit z viacero komponentov. Tak
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Cards from './Cards.js';
import { Button } from 'react-bootstrap';
import Stats from './Stats.js';
import Tower from './Tower.js';
import PlayedCard from './PlayedCard.js';
import { INITIATE_GAME, NEW_GAME_STATE } from '../constants.js';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.socket = null; // tu by bolo dobre ho dat, ale nviem ci sa to spravne dostane do Cards
    }

    //v component didmount mame propsy. Tam inicializujeme websoket , musime posileat z neho
    //make some higherorder fctions to put this away from component
    componentDidMount () {
        //initial size
        let wrap = document.getElementById("gameWrapper");
        if(wrap){ //je v DOMe
            wrap.style.width = (Math.floor(wrap.offsetHeight) * 1.7).toString() + "px";
        }
        var loc = window.location, new_uri;
        if(loc.protocol === "https:") {
            new_uri = "wss://";
        } else {
            new_uri = "ws://";
        }
        new_uri += loc.host + "/game"
        this.socket = new WebSocket(new_uri);
        this.socket.onopen = (event) => {
            this.socket.send(JSON.stringify({
                typeOfRequest: INITIATE_GAME,
                lookingForGame: this.props.appState.lookingForGame,
                name: this.props.appState.name,
                token: this.props.appState.token
            })); //initialize game or request a game in progress in case of correspondence
        };
        this.socket.onmessage = (event) => {
            //for debug we throw in case of syntax
            console.log("msg recv");
            const contents = JSON.parse(event.data);
            console.log(contents);
            switch (contents.typeOfResponse) {
                case NEW_GAME_STATE:
                    /*this involves found match*/
                    /*alter tower size in css here */
                    console.log("DISPATCHING");
                    this.props.dispatch({ type: NEW_GAME_STATE, data: contents.data});
                    return;
                case 99:
                    console.log("got 99");
                    return;
                case 100:
                    console.log("got 100");
                    return;
                /* TODO tie proposed, win, loss etc */
            }
        }
        this.socket.onclose = (event) => {
            /* event will eventually contain data about win, loss, tie, or some error that caused the match to be aborted.
               This will need to be checked. Currently, only the error is default */
            console.log("connectionInterrupted");
            console.log(event);
            //this.props.dispatch(push("/lobby")); // something abruptly ended
            return;
        }
        this.socket.onerror = (event) => {
            console.log("websocket error");
            console.log(event.data);
            return;
        }
        /* this.socket.close*/
    }

    render() { //gamewrapper bude maintainovat aspect ratio. V Cards musi byt mapstatetoprops. PlayedCard musi decidovat, ci je img back
        return (
            <div id="gameWrapper" >
                <div className="gameHeader">
                    <Button> {this.props.appState.name} </Button>
                    <Button onClick={()=>{}}> Tie </Button>
                    {this.props.appState.correspondenceGame &&
                    <Button onClick={()=>{}}> Back to lobby </Button>}
                    {!this.props.appState.correspondenceGame &&
                    <Button onClick={()=>{}}> Back to lobby (lose) </Button>}
                    { this.props.appState.running ? <Button> {this.props.appState.opponentName} </Button> : <Button> Looking for opponent! </Button> }
                </div>
                <div className="statsWrapper">
                    <Stats type="Left" stats={this.props.appState.playerStats} />
                    <Tower type="Left" />
                    <PlayedCard card={this.props.appState.playedCard} />
                    <Tower type="Right" />
                    <Stats type="Right" stats={this.props.appState.opponentStats} />
                </div>
                <div className="cardsWrapper">
                    <Cards socket={this.socket}/>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(state => {
    return {
        appState: state.appState
    };
})(Game));