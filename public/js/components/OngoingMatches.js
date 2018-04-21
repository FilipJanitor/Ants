import React from 'react';

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

    render() { //red - waiting, green going
        if( this.state.ajaxSuccess) {
            return (
                <div className="container-fluid filler">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="well">
                                <Table striped bordered condensed hover>
                                    <thead>
                                        <tr>
                                            <th>Opponent</th>
                                            <th>Turn</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.scores.map((i) => {return (
                                            <tr key={i.name}>
                                                <td>{i.name}</td>
                                                <td>{i.onTurn}</td>
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
