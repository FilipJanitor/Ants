import React from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';


//<Rank rank={this.props.rank} score={this.props.score} wins={this.props.wins} ties={this.props.ties} loses={this.props.loses} />
// nneds to be ajaxed, no props are going to be sent
export default class Rank extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            wins: 0,
            loses: 0,
            ties: 0,
            rank: 0,
            ajaxSuccess: true
        };
    }

    componentDidMount() {
        axios
        .post("/myRank", { userId: this.props.userId, token: this.props.token })
        .then(res => {
            if (res.data.result == true) {
                this.setState({
                    score: res.data.scores,
                    wins: res.data.wins,
                    loses: res.data.loses,
                    ties: res.data.ties,
                    rank: res.data.rank,
                    ajaxSuccess: true
                });
            } else {
                this.setState((prevState) => {
                    return {...prevState, ajaxSuccess: false };
                });
            }
        })
        .catch((error) => { console.log(error); this.setState((prevState) => {
                return {...prevState, ajaxSuccess: false };
            });
        });
    }

    render() { //col 12 vsetko large
        if(this.state.ajaxSuccess){
            return (
            <div id="rank">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <h2> {this.props.name} </h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <img src={"/rank"+this.state.rank}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
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
                                    <td>{this.state.score}</td>
                                    <td>{this.state.wins}</td>
                                    <td>{this.state.ties}</td>
                                    <td>{this.state.loses}</td>
                                </tr>
                            </tbody>
                        </Table>
                        </div>
                    </div>
                </div>
            </div>
            );
        } else {
            return (
                <p> AJAX call failed </p>
            );
        }
    }
}