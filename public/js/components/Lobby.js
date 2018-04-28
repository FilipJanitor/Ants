//toto bude sranda tento styl
/* predstava
+---+-----------------+-----+
|Ong| Initiate game   | Ran |
|oin|                 |  k  |
|g  +-+-+-+-+-+-+-+-+-+-----+
|mat| | | | | | | | | | Top |
|che+-+-+-+-+-+-+-+-+-+ pla |
|s  |                 | yer |
|   | Achievements... | s   |
|   |                 |     |
+---+-----------------+-----+
*/
//make everything lg - span 100 perrcent
//ajax polling timer na serveri
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Rank from './Rank.js';
import Scoreboard from './Scoreboard.js';
import Achievements from './Achievements.js';
import OngoingMatches from './OngoingMatches.js';
import { initiateGame } from '../actions/lobbyActions.js'

import {
           NOT_LOOKING_FOR_MATCH,
           LOOKING_FOR_NORMAL_MATCH,
           LOOKING_FOR_HARDCORE_MATCH,
           LOOKING_FOR_CORRESPONDENCE_MATCH,
           LOOKING_FOR_HARDCORE_CORRESPONDENCE_MATCH
       } from '../constants';

//USE REACT THEY SAID IT  WILL BE FUN THEY SAID

//https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc
//https://stackoverflow.com/questions/44419650/react-js-set-a-default-value-into-a-prop
class Lobby extends React.Component {

    mapToAchievementObjects(list) {
      return list.map(i =>
        <li key={i.id} dangerouslySetInnerHTML={{ __html: i.tex }} />
      );
    }

    mapToMatchObjects(list) {
        return list.map(i =>
            <li key={i.id} dangerouslySetInnerHTML={{ __html: i.tex }} />
        );
    }

    initiateGame(dispatch,what){

    }

    componentDidMount() {
        //axios.get(`http://www.reddit.com/r/${this.props.subreddit}.json`)
        //  .then(res => {
        //    const posts = res.data.data.children.map(obj => obj.data);
        //    this.setState({ posts });
        //  });
      }

      //https://getbootstrap.com/docs/3.3/css/
//matches budu vo fixed grid. Achievements budu tak, ze sa budu premiestnovat s velkostou.
//display block - zaberie cely width
//propsy zrefaktorovat
    render() {
        //tieto veci preusporiadat tak, abz sa flexibilne menili
        return (
            <div className="constainer-fluid">
                <div className="row">
                    <div className="col-md-3 filler">
                        <OngoingMatches userId={this.props.appState.userId} token={this.props.appState.token} />
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="well">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="btn-group btn-group-justified">
                                                            <a href="javascript:void(0)" className="btn btn-default btn-lg" onClick={()=>initiateGame(this.props.dispatch, LOOKING_FOR_NORMAL_MATCH)}>
                                                                    Initiate normal game
                                                            </a>
                                                            <a href="javascript:void(0)" className="btn btn-default btn-lg" onClick={()=>initiateGame(this.props.dispatch, LOOKING_FOR_HARDCORE_MATCH)}>
                                                                    Initiate hardcore game
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="btn-group btn-group-justified">
                                                            <a href="javascript:void(0)" className="btn btn-default btn-lg" onClick={()=>initiateGame(this.props.dispatch, LOOKING_FOR_CORRESPONDENCE_MATCH)}>
                                                                    Initiate correspondence game
                                                            </a>
                                                            <a href="javascript:void(0)" className="btn btn-default btn-lg" onClick={()=>initiateGame(this.props.dispatch, LOOKING_FOR_HARDCORE_CORRESPONDENCE_MATCH)}>
                                                                    Initiate hardcore correspondence game
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <Achievements userId={this.props.appState.userId} token={this.props.appState.token} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row">
                            <div className="col-sm-12">
                                <Rank userId={this.props.appState.userId} token={this.props.appState.token} name={this.props.appState.name}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <Scoreboard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Lobby.defaultProps = {
    ongoingMatches: [],
    achievements: [],
    //rank: {},//toto mame priamo z prveho dopytu
    scores: []
};

export default withRouter(connect(state => {
    return {
        appState: state.appState
    };
})(Lobby));


