import React from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';


//<Rank rank={this.props.rank} score={this.props.score} wins={this.props.wins} ties={this.props.ties} loses={this.props.loses} />

export default class Rank extends React.Component {
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