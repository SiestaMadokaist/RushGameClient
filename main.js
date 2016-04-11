import React from 'react';
import Request from "superagent";
import Config from "./config";
import RushGamePlayer from "./component/rush_game"
import RushGameNetral from "./component/rush_game_netral"
import RushGameAI from "./component/rush_game_ai"

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = this.initialState();
    }

    /*
     * @param {StateObject} updates
     */
    updateState(updates){
        return new Promise((resolve, reject) => {
            this.setState(updates, resolve)
        })
    }

    initialState(){
        return {
            roomState: {
                player: undefined,
                ai: undefined,
                com: undefined,
                storage: 0,
            },
            isClosed: true,
            roomHistory: []
        }
    }

    updateRoomStateFromResponse(response){
        const roomState = response.body;
        const roomHistory = this.state.roomHistory.concat([roomState.data.id])
        this.updateState({roomState: roomState.data, isClosed: false, roomHistory: roomHistory})
    }

    rollbackRoomState(response){
        const roomState = response.body;
        const roomHistory = this.state.roomHistory;
        this.updateState({roomState: roomState.data, isClosed: false, roomHistory: roomHistory.slice(0, roomHistory.length - 1)})
    }

    rollback(){
        const url = Config.resources("/rooms/retrieve");
        const roomHistory = this.state.roomHistory;
        const room = Request
            .get(url)
            .query({room_id: roomHistory[roomHistory.length - 2]})
            .then(this.rollbackRoomState.bind(this))
    }

    newDeterministicRoom() {
        const url = Config.resources("/rooms/create");
        const room = Request
            .post(url)
            .send({algorithm: "deterministic"})
            .then(this.updateRoomStateFromResponse.bind(this));
    }

    newRandomRoom(){
        const url = Config.resources("/rooms/create");
        const room = Request
            .post(url)
            .send({algorithm: "purerandom"})
            .then(this.updateRoomStateFromResponse.bind(this));
    }

    newRouletteRoom() {
        const url = Config.resources("/rooms/create");
        const room = Request
            .post(url)
            .send({algorithm: "roulette"})
            .then(this.updateRoomStateFromResponse.bind(this));
    }

    newDeterministic2Room(){
        const url = Config.resources("/rooms/create");
        const room = Request
            .post(url)
            .send({algorithm: "deterministic2"})
            .then(this.updateRoomStateFromResponse.bind(this));
    }

    playCard(cardId){
        const url = Config.resources("/rooms/play");
        const roomId = this.state.roomState.id;
        const callback = (response) => {
            const roomState = response.body;
            if(roomId == roomState.data.id){
                setTimeout(() => {
                    this.playCard(cardId)
                }, 500)
            }else{
                this.updateRoomStateFromResponse(response);
            }
        }
        Request
            .post(url)
            .send({room_id: roomId, card_id: cardId})
            .then(callback.bind(this))
    }

    playerPoint(){
        if(this.state.roomState.challenger == undefined) { return 0 }
        if(this.state.roomState.challenger.point == undefined) { return 0 }
        return this.state.roomState.challenger.point
    }

    playerPointUI(){
        const p = this.playerPoint() == 0 ? "" : this.playerPoint()
        const style = {width: this.playerPoint() * 10}
        return <div className="player-point-bar" style={style}>
            {p}
        </div>
    }

    unusedPoint(){
        return 63 - this.aiPoint() - this.playerPoint()
    }

    unusedPointUI(){
        const p = this.unusedPoint() == 0 ? "" : this.unusedPoint()
        const style = {width: this.unusedPoint() * 10}
        return <div className="unused-point-bar" style={style}>
            {p}
        </div>
    }

    aiPoint(){
        if(this.state.roomState.ai == undefined) { return 0 }
        if(this.state.roomState.ai.point == undefined) { return 0 }
        return this.state.roomState.ai.point
    }


    aiPointUI(){
        const p = this.aiPoint() == 0 ? "" : this.aiPoint()
        const style = {width: this.aiPoint() * 10}
        return <div className="ai-point-bar" style={style}>
            {p}
        </div>
    }

    currentCard(){
        return <input type="button" value={this.state.roomState.com_card} className="btn btn-sm btn-default play-button centered" disabled></input>
    }

    currentStorage(){
        return <input type="button" value={this.state.roomState.storage} className="btn btn-sm btn-default play-button centered" disabled></input>
    }

    render(){
        return <div className="view-wrapper">
            <div className="point-bar">
                {this.playerPointUI()}
                {this.unusedPointUI()}
                {this.aiPointUI()}
            </div>
            <div className="wrapper">
                <RushGamePlayer challenger={this.state.roomState.challenger} isClosed={this.state.isClosed} onPlayButtonClicked={this.playCard.bind(this)} onRollbackButtonClicked={this.rollback.bind(this)}/>
                <div className="netral-area">
                    Current Card:
                    {this.currentCard()}
                    Current Storage:
                    {this.currentStorage()}
                    <br/>
                    Playing Against <b>{this.state.roomState.algorithm_name}</b>
                    <RushGameNetral onStartButtonClicked={this.newDeterministicRoom.bind(this)} buttonValue="start deterministic"/>
                    <RushGameNetral onStartButtonClicked={this.newDeterministic2Room.bind(this)} buttonValue="start deterministic2"/>
                    <RushGameNetral onStartButtonClicked={this.newRouletteRoom.bind(this)} buttonValue="start roulette"/>
                    <RushGameNetral onStartButtonClicked={this.newRandomRoom.bind(this)} buttonValue="start pure-random"/>
                </div>
                <RushGameAI ai={this.state.roomState.ai} />
            </div>
        </div>
    }
}

React.render(<App />, document.querySelector('#content'))
