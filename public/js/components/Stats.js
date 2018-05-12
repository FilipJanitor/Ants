import React from 'react';
import { connect } from 'react-redux';

export default class Stats extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <ul id={this.props.type+"info"} >
                <li className="builders" > {this.props.stats.builders} </li>
                <li className="bricks" > {this.props.stats.bricks} </li>
                <li className="warriors" > {this.props.stats.warriors} </li>
                <li className="weapons" > {this.props.stats.weapons} </li>
                <li className="mages" > {this.props.stats.mages} </li>
                <li className="crystals" > {this.props.stats.crystals} </li>
                <li className="castle" > {this.props.stats.castle} </li>
                <li className="wall" > {this.props.stats.wall} </li>
            </ul>
        );
    }
}
