import React from 'react';
import { connect } from 'react-redux';
import { NEXT_TURN } from '../constants.js';

export const CardBack = () => (
    <div className="card back">
        <div> </div>
    </div>
);

const playable = function(reqs, stats) {
    return (! ( stats.bricks < reqs.bricks ||
        stats.weapons < reqs.weapons ||
        stats.crystals < reqs.crystals));
};

const foldCard = function(index, dispatch, ws, name, token) {
    //anim
    dispatch({type: NEXT_TURN});
    ws.send(JSON.stringify({
        typeOfRequest: NEXT_TURN,
        folds: true, cardIndex: index,
        name: name,
        token: token
    }));
};

const playCard = function(index, dispatch, ws, name, token) {
    dispatch({type: NEXT_TURN});
    ws.send(JSON.stringify({
        typeOfRequest: NEXT_TURN,
        folds: false, cardIndex: index,
        name: name,
        token: token
    }));

};

class Cards extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        if(this.props.appState.onTurn && this.props.appState.running){
            return (
                <div className="cards" >
                { this.props.appState.cards.map((card,i) => {
                    let cardType = "";
                    let reqNumber = 0;
                    if(card.requirements.bricks !== undefined ) {
                        cardType = " bricks";
                        reqNumber = card.requirements.bricks;
                    }
                    if(card.requirements.weapons !== undefined ) {
                        cardType = " weapons";
                        reqNumber = card.requirements.weapons;
                    }
                    if(card.requirements.crystals !== undefined ) {
                        cardType = " crystals";
                        reqNumber = card.requirements.crystals;
                    }
                    if(playable(card.requirements, this.props.appState.playerStats)){
                        return ( /*ten vonkajsi sa nemeni, ten vnutorny sa bude otacat */
                            <div key={"card"+i} className={"card"+cardType} id={"card"+i} onClick={() => {playCard(i, this.props.dispatch, this.props.socket, this.props.appState.name, this.props.appState.token)}} onContextMenu={(e) => {e.preventDefault(); foldCard(i, this.props.dispatch, this.props.socket, this.props.appState.name, this.props.appState.token)}}>
                                <div  style={{ backgroundImage: 'url("'+ card.img + '")'}} ><span>{reqNumber}</span> <b>{card.name}</b>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td> {card.description} </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        );
                    } else {
                        //render gray card unclikcable
                        return (
                            <div key={"card"+i} id={"card"+i} className={"card"+cardType+" grayCard" } onContextMenu={(e) => {e.preventDefault(); foldCard(i, this.props.dispatch, this.props.socket, this.props.appState.name, this.props.appState.token)}}>
                                <div style={{ backgroundImage: 'url("'+ card.img + '")'}}><span>{reqNumber}</span> <b>{card.name}</b>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td> {card.description} </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        );
                    }
                }) }
                </div>
            );
        } else {
            return (
                <div className="cards" >
                    <CardBack/>
                    <CardBack/>
                    <CardBack/>
                    <CardBack/>
                    <CardBack/>
                    <CardBack/>
                    <CardBack/>
                    <CardBack/>
                </div>
            );
        }
    }
}


export default connect(state => {
    return {
        appState: state.appState
    };
})(Cards);