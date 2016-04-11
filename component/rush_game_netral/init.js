import React from "react";
import Request from "superagent";
import Config from "../../config";
class RushGameNetral extends React.Component {
    constructor(props){
        super(props);
    }

    startButton(){
        const style = {marginTop: 10, width: 120}
            return <input type="button" value={this.props.buttonValue} className="btn btn-sm btn-success play-button centered" style={style} onClick={this.props.onStartButtonClicked}></input>
    }

    render(){
        return this.startButton();
    }
}
export default RushGameNetral;
