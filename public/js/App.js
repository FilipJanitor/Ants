import React from "react";
import { connect } from "react-redux"; //toto spaja redux state do propsov


//hlavny komponent
class MainComponent extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div class="page-header">
                    <Header />
                </div>
                <div>
                    {this.props.children} //sem davame komponentove deti z routru    
                </div>
                <div class="page-footer">
                    <Footer />
                </div>
            </div>   
        )
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render(props){
        return(
            <h1> Ants </h1>
        )
    }
}

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }
    //TODO copyright info
    render(props){
        return(
            <footer> TODO legal info </footer>
        )
    }
}