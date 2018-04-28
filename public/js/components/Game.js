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
        this.socket = 0;
        this.socket.onopen = function(event) {
            this.socket.send(JSON.stringify({
                typeOfRequest: INITIATE_GAME,
                lookingForGame: this.props.appstate.lookingForGame,
                name: this.props.appState.name,
                token: this.props.appState.token
            })); //initialize game or request a game in progress in case of correspondence
        }
        this.socket.onmessage = function(event) {
            //for debug we throw in case of syntax errors
            const contents = JSON.parse(event.data);
            switch (body.typeOfResponse) {
                case NEW_GAME_STATE:
                    /*this involves found match*/
                    this.props.dispatch({ type: NEW_GAME_STATE, data: contents.data});
                    return;
                /* TODO tie proposed, win, loss etc */
            }
        }
        this.socket.onclose = function() {
            return;
        }
        this.socket.onerror = function() {
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