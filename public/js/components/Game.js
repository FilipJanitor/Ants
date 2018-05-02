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
import Wall from './Wall.js';
import PlayedCard from './PlayedCard.js';
import { INITIATE_GAME, NEW_GAME_STATE, YOU_LOST, YOU_WON, DISCARD } from '../constants.js';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.socket = null; // tu by bolo dobre ho dat, ale nviem ci sa to spravne dostane do Cards
    }

    //v component didmount mame propsy. Tam inicializujeme websoket , musime posileat z neho
    //make some higherorder fctions to put this away from component
    componentDidMount () {
        //initial size
        /*let wrap = document.getElementById("gameWrapper");
        if(wrap){ //je v DOMe
            wrap.style.width = (Math.floor(wrap.offsetHeight) * 1.7).toString() + "px";
        }*/
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
                    this.props.dispatch({ type: NEW_GAME_STATE, data: contents.data});
                    return;
                case YOU_LOST:
                    this.props.dispatch({ type: YOU_LOST});
                    return;
                case YOU_WON:
                    this.props.dispatch({ type: YOU_WON});
                    return;
                /* TODO tie proposed, win, loss etc */
            }
        }
        this.socket.onclose = (event) => {
            this.props.dispatch({ type: DISCARD });

            /* event will eventually contain data about win, loss, tie, or some error that caused the match to be aborted.
               This will need to be checked. Currently, only the error is default */
            console.log("connectionInterrupted");
            console.log(event);
            this.props.dispatch(push("/lobby")); // something abruptly ended
            return;
        }
        this.socket.onerror = (event) => {
            console.log("websocket error");
            console.log(event.data);
            return;
        }
        /* this.socket.close*/
    }
/*
                    <Button onClick={()=>{}}> Tie </Button>
                    {this.props.appState.correspondenceGame &&
                    <Button onClick={()=>{}}> Back to lobby </Button>}
                    {!this.props.appState.correspondenceGame &&
                    <Button onClick={()=>{}}> Back to lobby (lose) </Button>}
*/
    render() { //gamewrapper bude maintainovat aspect ratio. V Cards musi byt mapstatetoprops. PlayedCard musi decidovat, ci je img back
        if(this.props.appState.ended) {
            return (
                <div>
                    {this.props.appState.won ? <h1> You won </h1>  : <h1> you lost </h1>}
                </div>
            )
        }
        return (
            <div id="gameWrapper" className="anim" >
                <div className="spanner" style={{position: "float"}}>
                    <div id="p1" className="sel" > {this.props.appState.name} </div>
                    <div id="cdp">
                        <PlayedCard card={this.props.appState.playedCard} />
                        <div id="cd">
                            <div> buttons </div>
                        </div>
                    </div>
                    <div id="p2" className="sel" > {this.props.appState.running ? this.props.appState.opponentName : "Looking for opponent!"} </div>
                </div>
                <Stats type="p1" stats={this.props.appState.playerStats} />
                <Tower type="p1" stat={this.props.appState.playerStats.castle} />
                <Wall type="p1" stat={this.props.appState.playerStats.wall} />

                <Wall type="p2" stat={this.props.appState.opponentStats.wall} />
                <Tower type="p2" stat={this.props.appState.opponentStats.castle} />
                <Stats type="p2" stats={this.props.appState.opponentStats} />

                <Cards socket={this.socket}/>
            </div>
        );
    }
}

export default withRouter(connect(state => {
    return {
        appState: state.appState
    };
})(Game));