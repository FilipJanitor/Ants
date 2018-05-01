import React from 'react';
import { connect } from 'react-redux';

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

const foldCard = function(index, dispatch, ws) {

};

const playCard = function(index, dispatch, ws) {

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
                            <div key={"card"+i} className={"card"+cardType} id={"card"+i} onClick={() => {playCard(i, this.props.dispatch, this.props.socket)}} onContextMenu={() => {foldCard(i, this.props.dispatch, this.props.socket)}} style={{ backgroundImage: "url("+ card.img + ");"}}>
                                <div><span>{reqNumber}</span> <b>{card.name}</b>
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
                            <div key={"card"+i} id={"card"+i} className={"card"+cardType+" grayCard" } style={{ backgroundImage: "url("+ card.img + ");"}}>
                                <div><span>{reqNumber}</span> <b>{card.name}</b>
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