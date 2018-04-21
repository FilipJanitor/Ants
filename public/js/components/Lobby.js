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
import { Table } from 'react-bootstrap';
import axios from 'axios';

import {
           NOT_LOOKING_FOR_MATCH,
           LOOKING_FOR_NORMAL_MATCH,
           LOOKING_FOR_HARDCORE_MATCH,
           LOOKING_FOR_CORRESPONDENCE_MATCH,
           LOOKING_FOR_HARDCORE_CORRESPONDENCE_MATCH
       } from '../client.js';

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
            <div>
                <OngoingMatches userId={this.props.appState.userId} />
                <div id="initiateGame">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-6" onClick={()=>initiateGame(this.props.dispatch, LOOKING_FOR_NORMAL_MATCH)}>
                                Initiate normal game
                            </div>
                            <div className="col-sm-6" onClick={()=>initiateGame(this.props.dispatch, LOOKING_FOR_HARDCORE_MATCH)}>
                                Initiate hardcore game
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6" onClick={()=>initiateGame(this.props.dispatch, LOOKING_FOR_CORRESPONDENCE_MATCH)}>
                                Initiate correspondence game
                            </div>
                            <div className="col-sm-6" onClick={()=>initiateGame(this.props.dispatch, LOOKING_FOR_HARDCORE_CORRESPONDENCE_MATCH)}>
                                Initiate hardcore correspondence game
                            </div>
                        </div>
                    </div>
                </div>
                <Achievements userId={this.props.appState.userId} token={this.props.appState.token} />
                <Rank rank={this.props.appState.rank} score={this.props.appState.score} wins={this.props.appState.wins} ties={this.props.appState.ties} loses={this.props.appState.loses} name={this.props.appState.name}/>
                <Scoreboard />
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

class Scoreboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {scores: [], ajaxSuccess: true};
    }

    componentDidMount() {
        axios
        .post("/scoreboard", { /* raz tu bude aj toto: token*/ })
        .then(res => {
            if (res.data.result == true) {
                this.setState({scores: res.data.scores, alaxSuccess: true});
            } else {
                this.setState((prevState) => {
                    return {scores: prevState.scores, ajaxSuccess: false };
                });
            }
        })
        .catch((error) => {console.log(error);this.setState((prevState) => {
                    return {scores: prevState.scores, ajaxSuccess: false };
                });});
    }

    render() {
        if( this.state.ajaxSuccess) {
            return (
            <div id="scoreboard">
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Score</th>
                            <th>Wins</th>
                            <th>Ties</th>
                            <th>Loses</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.scores.map((i) => {return (
                            <tr>
                                <td>{i.name}</td>
                                <td>{i.score}</td>
                                <td>{i.wins}</td>
                                <td>{i.ties}</td>
                                <td>{i.loses}</td>
                            </tr>
                        );})}
                    </tbody>
                </Table>
            </div>
            );
        } else {
            return (
                <p> AJAX call failed </p>
            );
        }
    }
}

//<Rank rank={this.props.rank} score={this.props.score} wins={this.props.wins} ties={this.props.ties} loses={this.props.loses} />

class Rank extends React.Component {
    constructor(props) {
        super(props);
    }

    render() { //col 12 vsetko large
        return (
        <div id="rank">
            <div className="container">
                <div className="row">
                    <div className="">
                        <h2> {this.props.name} </h2>
                    </div>
                </div>
                <div className="row">
                    <div className="">
                        <img src={"/rank"+this.props.rank}/>
                    </div>
                </div>
                <div className="row">
                    <div className="">
                    <Table striped bordered condensed>
                        <thead>
                            <tr>
                                <th>Score</th>
                                <th>Wins</th>
                                <th>Ties</th>
                                <th>Loses</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.props.score}</td>
                                <td>{this.props.wins}</td>
                                <td>{this.props.ties}</td>
                                <td>{this.props.loses}</td>
                            </tr>
                        </tbody>
                    </Table>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

class OngoingMatches extends React.Component {
    constructor(props) {
        super(props);
    }

    render() { //col 12 vsetko large
        return (
        <div id="ongoingmatches">AAAAAAAAAA</div>
        );
    }
}

class Achievements extends React.Component {
    constructor(props) {
        super(props);
    }

    render() { //col 12 vsetko large
        return (
        <div id="achievements">AAAAAAAAAA</div>
        );
    }
}