import React from 'react';
import { CardBack } from './Cards.js';

export default class PlayedCard extends React.Component{
    render() {
        if( this.props.card === -1 ){
            return ( <CardBack /> );
        } else {
            return ( <div className="card">
                <img src={this.props.card.img} className="img-responsive" />
                <p>{this.props.card.name}</p>
                <p>{this.props.card.description}</p>
        </div> );
        }
    }
}