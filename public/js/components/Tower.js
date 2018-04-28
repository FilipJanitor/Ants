import React from 'react';

//transformacia sa robi cez css
export default class Tower extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <img src={"tower"+this.props.type} id={"tower"+this.props.type} />
            </div>
        );
    }
}
