import React from 'react';

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
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="well">
                            <div className="row">
                                <div className="col-sm-12">
                                    TODO achievements
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}