import React from "react";
import Request from "superagent";
import Config from "../../config";
class RushGamePlayer extends React.Component {
    constructor(props){
        super(props);
    }

    ammo(){
        const _default = [1, 2, 3, 4, 5, 6]
        if(this.props.ai == undefined) { return _default}
        if(this.props.ai.ammo == undefined) { return _default}
        return this.props.ai.ammo;
    }

    classNameForCard(i){
        if(this.ammo().indexOf(i) == -1){
            return <input type="button" value={i} className="btn btn-sm btn-warning play-button" disabled></input>
        }else{
            return <input type="button" value={i} className="btn btn-sm btn-info play-button" disabled></input>
        }
    }

    initialUI(){
        return [1,2,3,4,5,6]
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
                Available Cards
                {this.initialUI()}
            </div>
        </div>
    }
}
export default RushGamePlayer;
