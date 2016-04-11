import React from "react";
import Request from "superagent";
import Config from "../../config";
class RushGamePlayer extends React.Component {
    constructor(props){
        super(props);
    }

    ammo(){
        const _default = [];
        if(this.props.ai == undefined) { return _default}
        if(this.props.ai.ammo == undefined) { return _default}
        return this.props.ai.ammo;
    }


    classNameForCard(i){
        return <input type="button" value={i} className="btn btn-sm btn-primary play-button centered"></input>
    }

    initialUI(){
        return this.ammo()
            .map(this.classNameForCard.bind(this))
    }

    score(){
        if(this.props.ai == undefined) { return 0}
        if(this.props.ai.point == undefined) { return 0}
        return this.props.ai.point;
    }

    render(){
        return <div className="player-hand">
            <div className="player-hand-header">
                Current Score: {this.score()} <br></br>
                AI previous card:
                {this.initialUI()}
            </div>
        </div>
    }
}
export default RushGamePlayer;
