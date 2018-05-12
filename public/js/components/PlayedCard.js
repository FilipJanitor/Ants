import React from 'react';
import { CardBack } from './Cards.js';

export default class PlayedCard extends React.Component{
    render() {
        let card = this.props.card;
        if( card === -1 ){
            return (
                <div className="card back" id="cp">
                    <div> </div>
                </div>
            );
        } else {
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
            return (
                <div className={"card"+cardType} id="cp">
                    <div  style={{backgroundImage: 'url("'+ card.img + '")'}} ><span>{reqNumber}</span> <b>{card.name}</b>
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
    }
}