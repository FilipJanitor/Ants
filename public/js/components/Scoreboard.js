import React from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

export default class Scoreboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {scores: [], ajaxSuccess: true};
    }

    componentDidMount() {
        axios
        .get("/scoreboard")
        .then(res => {
            console.log(res);
            if (res.data.result == true) {
                this.setState({scores: res.data.scores, ajaxSuccess: true});
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
                            <tr key={i.name}>
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