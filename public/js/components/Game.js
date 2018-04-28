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

class Game extends React.Component {
    constructor(props) {
        super(props);
    }

    //v component didmount mame propsy. Tam inicializujeme websoket , musime posileat z neho

    render() { //gamewrapper bude maintainovat aspect ratio. V Cards musi byt mapstatetoprops. PlayedCard musi decidovat, ci je img back
        return (
            <div id="gameWrapper">
                <div className="gameBackground">
                    <img className="autoFill" src="/background" />
                </div>
                <div className="gameHeader">
                    <Button> {this.props.appState.name} </Button>
                    <Button onClick={()=>{}}> Tie </Button>
                    {this.props.appState.correspondenceGame &&
                    <Button onClick={()=>{}}> Back to lobby </Button>}
                    {!this.props.appState.correspondenceGame &&
                    <Button onClick={()=>{}}> Back to lobby (lose) </Button>}
                    { this.props.appState.running ? <Button> {this.props.appstate.opponentName} </Button> : <Button> Looking for opponent! </Button> }
                </div>
                <div className="statsWrapper">
                    <Stats type="Left" stats={this.props.appState.playerStats} />
                    <Tower type="Left" />
                    <PlayedCard card={this.props.appState.playedCard} />
                    <Tower type="Right" />
                    <Stats type="Right" stats={this.props.appState.opponentStats} />
                </div>
                <div className="cardsWrapper">
                    <Cards/>
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