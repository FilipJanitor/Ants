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

        document.getElementById("header").style.display = "block";
        document.getElementById("footer").style.display = "block";
        document.getElementById("GameWindow").style.height = (window.innerHeight - 160 - 100).toString() + "px";

      }

    render() {
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
    scores: []
};

export default withRouter(connect(state => {
    return {
        appState: state.appState
    };
})(Lobby));


