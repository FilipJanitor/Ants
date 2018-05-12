import React from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { RANKS } from '../constants';

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
                let r = 0;
                if(res.data.wins>1){
                    r = 1;
                }
                if(res.data.wins>10){
                    r = 2;
                }
                if(res.data.wins>20){
                    r = 3;
                }
                if(res.data.wins>30){
                    r = 4;
                }
                if(res.data.wins>50){
                    r = 5;
                }
                if(res.data.wins>70){
                    r = 6;
                }
                if(res.data.wins>90){
                    r = 7;
                }
                if(res.data.wins>100){
                    r = 8;
                }
                if(res.data.wins>120){
                    r = 9;
                }
                if(res.data.wins>150){
                    r = 10;
                }
                if(res.data.wins>200){
                    r = 11;
                }
                if(res.data.wins>250){
                    r = 12;
                }
                if(res.data.wins>300){
                    r = 13;
                }
                if(res.data.wins>400){
                    r = 14;
                }
                if(res.data.wins>500){
                    r = 15;
                }
                this.setState({
                    score: res.data.score,
                    wins: res.data.wins,
                    loses: res.data.loses,
                    ties: res.data.ties,
                    rank: r,
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

    render() {
        if(this.state.ajaxSuccess){
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="well">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h2> {this.props.name} </h2>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h5> {RANKS[this.state.rank]} </h5>
                                            <img src={"/rank"+this.state.rank} className="img-responsive" style={{margin: "0 auto"}}/>
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