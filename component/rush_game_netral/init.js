import React from "react";
import Request from "superagent";
import Config from "../../config";
class RushGameNetral extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return <div className="netral-area">
            Current Card: {this.props.currentCard}<br></br>
            Current Storage: {this.props.storage}
        </div>
    }
}
export default RushGameNetral;
