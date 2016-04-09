import React from "react";
import Request from "superagent";
import Config from "../../config";
class RushGamePlayer extends React.Component {
    constructor(props){
        super(props);
    }

    ammo(){
        const _default = [1, 2, 3, 4, 5, 6]
        console.log(this.props)
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

    initialUI(){
        return this.ammo()
            .map((i) => <input type="button" value={i} className="btn btn-sm btn-primary play-button" onClick={this.playCard.bind(this)}></input>)
    }

    closed(){
        return <div className="player-hand-header">
            <input type="button" value="start" className="btn btn-sm btn-primary play-button" onClick={this.props.onStartButtonClicked}></input>
        </div>
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
            {this.backButton()}
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
