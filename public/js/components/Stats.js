import React from 'react';
import { connect } from 'react-redux';

//transformacia sa robi cez css
export default class Stats extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return ( //width 100 pre wrappery
            <div>
                <div className="stat build">
                    <div className="stat row">
                        <img src="/builders" className="img-responsive" />
                        {this.props.stats.builders}
                    </div>
                    <div className="stat row">
                        <img src="/bricks" className="img-responsive" />
                        {this.props.stats.bricks}
                    </div>
                </div>
                <div className="stat war">
                    <div className="stat row">
                        <img src="/warriors" className="img-responsive" />
                        {this.props.stats.wariors}
                    </div>
                    <div className="stat row">
                        <img src="/weapons" className="img-responsive" />
                        {this.props.stats.weapons}
                    </div>
                </div>
                <div className="stat mage">
                    <div className="stat row">
                        <img src="/mages" className="img-responsive" />
                        {this.props.stats.mages}
                    </div>
                    <div className="stat row">
                        <img src="/crystals" className="img-responsive" />
                        {this.props.stats.crystals}
                    </div>
                </div>
                <div className="stat cast">
                    <div className="stat row">
                        <img src="/walls" className="img-responsive" />
                        {this.props.stats.walls}
                    </div>
                    <div className="stat row">
                        <img src="/castles" className="img-responsive" />
                        {this.props.stats.castles}
                    </div>
                </div>
            </div>
        );
    }
}
