import React from 'react';

//transformacia sa robi cez css
export default class Tower extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const castle = (
            <div key={"castle"+this.props.type} className="castle displayHorizontally">
                <img src={"tower"+this.props.type} id={"tower"+this.props.type} />
            </div>
        );
        const wall = (
            <div key={"wall"+this.props.type} className="tower displayHorizontally">
                <img src={"tower"+this.props.type} id={"tower"+this.props.type} />
            </div>
        )
        return [castle,wall];
    }
}
