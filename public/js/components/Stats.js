import React from 'react';
import { connect } from 'react-redux';

//transformacia sa robi cez css
export default class Stats extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return ( //width 100 pre wrappery
            <div className="innerStatsWrapper displayHorizontally" >
                <div className="stat build">
                    <div className="stat row">
                        <img src="/IMGbuilders" className="img-responsive" />
                        {this.props.stats.builders}
                    </div>
                    <div className="stat row">
                        <img src="/IMGbricks" className="img-responsive" />
                        {this.props.stats.bricks}
                    </div>
                </div>
                <div className="stat war">
                    <div className="stat row">
                        <img src="/IMGwarriors" className="img-responsive" />
                        {this.props.stats.wariors}
                    </div>
                    <div className="stat row">
                        <img src="/IMGweapons" className="img-responsive" />
                        {this.props.stats.weapons}
                    </div>
                </div>
                <div className="stat mage">
                    <div className="stat row">
                        <img src="/IMGmages" className="img-responsive" />
                        {this.props.stats.mages}
                    </div>
                    <div className="stat row">
                        <img src="/IMGcrystals" className="img-responsive" />
                        {this.props.stats.crystals}
                    </div>
                </div>
                <div className="stat cast">
                    <div className="stat row">
                        <img src="/IMGwalls" className="img-responsive" />
                        {this.props.stats.walls}
                    </div>
                    <div className="stat row">
                        <img src="/IMGcastles" className="img-responsive" />
                        {this.props.stats.castles}
                    </div>
                </div>
            </div>
        );
    }
}
