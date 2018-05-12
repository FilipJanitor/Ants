import React from 'react';
import axios from 'axios';

export default class Achievements extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            achievementsObtained: [],
            achievementsLocked: [],
            ajaxSuccess: true
        };
    }

    componentDidMount() {
        axios
        .post("/myAchievements", { userId: this.props.userId, token: this.props.token })
        .then(res => {
            if (res.data.result == true) {
                this.setState({
                    achievementsObtained: res.data.achievementsObtained,
                    achievementsLocked: res.data.achievementsLocked,
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
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="well">
                            <div className="row display-flex">

                                {this.state.achievementsObtained.map((i) => {
                                    return (
                                        <div className="col-xs-6 col-sm-4, col-md-3, col-lg-2" key={i.name}>
                                            <div className="well">
                                                <h5>{i.name}</h5>
                                                <h6>{i.description}</h6>
                                                <img src="/AO" className="spanner" />
                                            </div>
                                        </div>
                                    );
                                })}
                                {this.state.achievementsLocked.map((i) => {
                                    return (
                                        <div className="col-xs-6 col-sm-4, col-md-3, col-lg-2" key={i.name}>
                                            <div className="well">
                                                <h5>{i.name}</h5>
                                                <img src="/AL" className="spanner" />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}