import React from "react";
import Request from "superagent";
import Config from "../../config";
class RushGamePlayer extends React.Component {
    constructor(props){
        super(props);
    }

    ammo(){
        const _default = [1, 2, 3, 4, 5, 6]
        if(this.props.challenger == undefined) { return _default}
        if(this.props.challenger.ammo == undefined) { return _default}
        return this.props.challenger.ammo;
    }

    backButton(){
        if(this.ammo().length == 6){ return }
        return <input type="button" value="back" onClick={this.props.onRollbackButtonClicked}></input>
    }

    playCard(event){
        this.props.onPlayButtonClicked(event.target.value);
    }

    classNameForCard(i){
        if(this.ammo().indexOf(i) == -1){
            return <input type="button" value={i} className="btn btn-sm btn-default play-button centered" disabled></input>
        }else{
            return <input type="button" value={i} className="btn btn-sm btn-primary centered play-button" onClick={this.playCard.bind(this)}></input>
        }
    }

    initialUI(){
        return [1,2,3,4,5,6]
            .map(this.classNameForCard.bind(this))
    }

    closed(){
    }

    score(){
        if(this.props.challenger == undefined) { return 0}
        if(this.props.challenger.point == undefined) { return 0}
        return this.props.challenger.point;
    }

    opened(){
        return <div className="player-hand-header">
            <div>
                Current Score: {this.score()} <br></br>
            </div>
            <div>
                Available Cards
            </div>
            {this.initialUI()}
        </div>
    }

    render(){
        const style = {clear: "both"}
        return <div className="player-hand" style={style}>
            {this.props.isClosed ? this.closed() : this.opened()}
        </div>
    }
}
export default RushGamePlayer;
