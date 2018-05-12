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
//more than 12 cols wrap - vnutorny col dynamicky gfenerovaty
    render() {/*{this.renderAchievements(this.state)}*/
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
                                                <img src="/AO" className="spanner"/*"img-responsive"*/  />
                                            </div>
                                        </div>
                                    );
                                })}
                                {this.state.achievementsLocked.map((i) => {
                                    return (
                                        <div className="col-xs-6 col-sm-4, col-md-3, col-lg-2" key={i.name}>
                                            <div className="well">
                                                <h5>{i.name}</h5>
                                                <img src="/AL" className="spanner"/*"img-responsive"*/ />
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
/* in case flex breaks
    renderAchievements(state) {
        dataArray = [];
        var i;
        var counter = 1;
        for(i = 0; i < state.achievementsObtained; i++){
            dataArray.push(
                <div className="col-xs-6 col-sm-4, col-md-3, col-lg-2" key={state.achievementsObtained[i].name}>
                    <div className="wall">
                        <h4>{state.achievementsObtained[i].name}</h4>
                        <h6>{state.achievementsObtained[i].description}</h6>
                        <img src="/AO" className="img-responsive" />
                    </div>
                </div>
            );
            counter++
        }
        for(i = 0; i < state.achievementsLocked; i++){
            dataArray.push(
                <div className="col-xs-6 col-sm-4, col-md-3, col-lg-2" key={i.name}>
                    <div className="wall">
                        <h4>{i.name}</h4>
                        <img src="/AL" className="img-responsive" />
                    </div>
                </div>
            );
        }
        return dataArray;
    } */
}