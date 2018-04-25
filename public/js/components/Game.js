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

class Game extends React.Component {
    constructor(props) {
        super(props);
    }

    render() { //gamewrapper bude maintainovat aspect ratio. V Cards musi byt mapstatetoprops
        return (
            <div id="gameWrapper">
                <div className="gameBackground">
                    <img className="autoFill" src="/background" />
                </div>
                <div className="gameHeader">
                    <Button onClick={()=>{}}> Tie </Button>
                    {this.props.appState.correspondenceGame &&
                    <Button onClick={()=>{}}> Back to lobby </Button>}
                </div>
                <div className="statsWrapper">
                    <Stats type="Left" stats={this.props.appState.playerStats} />
                    <Tower type="Left" />
                    <Tower type="Right" />
                    <Stats type="Right" stats={this.props.appStatle.opponentState} />
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