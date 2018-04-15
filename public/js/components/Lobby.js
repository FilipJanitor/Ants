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

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
           NOT_LOOKING_FOR_MATCH,
           LOOKING_FOR_NORMAL_MATCH,
           LOOKING_FOR_HARDCORE_MATCH,
           LOOKING_FOR_CORRESPONDENCE_MATCH,
           LOOKING_FOR_HARDCORE_CORRESPONDENCE_MATCH
       } from '../client.js';

export
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

    mapToScoreObjects(list) {
        return list.map(i =>
            <li key={i.id} dangerouslySetInnerHTML={{ __html: i.tex }} />
        );
    }

    wrapRank(rank) {
        return(
            <div>
                TODO
            </div>
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
    render() {
        const ongoingMatches = this.mapToMatchObjects(this.props.ongoingMatches);
        const achievements = this.mapToAchievementObjects(this.props.achievements);
        const rank = this.wrapRank(this.props.rank);
        const scores = this.mapToScoreObjects(this.props.scores);
        //tieto veci preusporiadat tak, abz sa flexibilne menili
        return (
            <div>
                <div id="ongoingMatches">
                    {ongoingMatches}
                </div>
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
                <div id="achievements">
                    {achievements}
                </div>
                <div id="rank">
                    {rank}
                </div>
                <div id="scoreboard">
                    {scores}
                </div>
            </div>
        );
    }
}

Lobby.defaultProps = {
    ongoingMatches: [],
    achievements: [],
    rank: {},//tu bude potreebne info na render
    scores: []
};

export default withRouter(connect(state => {
    return {
        appState: state.appState
    };
})(Lobby));
