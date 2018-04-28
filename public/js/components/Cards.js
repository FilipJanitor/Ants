import React from 'react';
import { connect } from 'react-redux';

const CardBack = () => (
    <div className="card">
        <img src="card.png" className="img-responsive" />
    </div>
);

class Cards extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        if(this.props.appState.onTurn){
            return (
                <div>
                { this.props.appState.cards.map((card,i) => {
                    if(playable(card.requirements, this.props.appState.playerStats)){
                        return ( /*ten vonkajsi sa nemeni, ten vnutorny sa bude otacat */
                            <div className="card">
                                <div id={"card"+i} onClick={playCard(i)} onContextMenu={foldCard(i)}>
                                    <img src={card.img} className="img-responsive" />
                                    <p>{card.name}</p>
                                    <p>{card.description}</p>
                                </div>
                            </div>
                        );
                    } else {
                        //render gray card unclikcable
                        return (
                            <div id={"card"+i} className="card grayCard" >
                                <img src={card.img} className="img-responsive" />
                                <p>{card.name}</p>
                                <p>{card.description}</p>
                            </div>
                        );
                    }
                }) }
                </div>
            );
        } else {
            return (
                <div>
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