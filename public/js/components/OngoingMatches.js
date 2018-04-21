import React from 'react';

export default class OngoingMatches extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matches = [],
            ajaxSuccess: true
        };
    }

    componentDidMount() {
        /*axios
        .post("/myMatches", { userId: this.props.userId, token: this.props.token })
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
        });*/
    }

    render() { //col 12 vsetko large
        return (
            <div className="container-fluid filler">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="well">
                            TODO ongoing matches
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
