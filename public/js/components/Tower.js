import React from 'react';
import { connect } from 'react-redux';

//transformacia sa robi cez css
class Tower extends React.Component {
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
