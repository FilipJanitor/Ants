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
                <div className="statsWrapper">
                    <Stats type="left" stats={this.props.appState.playerStats} />
                    <Tower type="left" stats={this.props.appState.playerStats} />
                    <Tower type="right" stats={this.props.appState.opponentStats} />
                    <Stats type="right" stats={this.props.appStatle.opponentState} />
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