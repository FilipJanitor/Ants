import React from 'react';

export default class Wall extends React.Component {
    render() {
        return (
                <div id={this.props.type+"wall"} style={{height: ((this.props.stat + 8) / 2.2) + "%", display: (this.props.stat > 0 ? "block" : "none" )}}>
                </div>
        );
    }
}
