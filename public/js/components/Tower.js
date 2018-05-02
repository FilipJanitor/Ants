import React from 'react';

//transformacia sa robi cez css
// vnutri este <div id=flag></div>
export default class Tower extends React.Component {
    render() {
        return (
            <div id={this.props.type+"ground"} >
                <div id={this.props.type+"castle"} style={{height: ( 10+ (Math.max(this.props.stat,-10) / 2.2))+ "%"}}>
                </div>
            </div>
        );
    }
}
