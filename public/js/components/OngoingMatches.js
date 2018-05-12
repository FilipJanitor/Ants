import React from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

export default class OngoingMatches extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matches: [],
            ajaxSuccess: true
        };
    }

    componentDidMount() {
        axios
        .post("/myMatches", { userId: this.props.userId, token: this.props.token })
        .then(res => {
            if (res.data.result == true) {
                this.setState({
                    matches: res.data.matches,
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
        if( this.state.ajaxSuccess) {
            return (
                <div className="container-fluid filler">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="well">
                                <Table striped bordered condensed>
                                    <thead>
                                        <tr>
                                            <th>Opponent</th>
                                            <th>Result</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.matches.map((i) => {return (
                                            <tr key={i.id} onClick={()=>{i.id}}>
                                                <td>{i.opponent}</td>
                                                <td>{i.result}</td>
                                            </tr>
                                        );})}
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
