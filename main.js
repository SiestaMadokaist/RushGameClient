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

    newRoom() {
        const url = Config.resources("/rooms/create");
        const room = Request
            .post(url)
            .then(this.updateRoomStateFromResponse.bind(this));
    }

    playCard(cardId){
        const url = Config.resources("/rooms/play");
        const roomId = this.state.roomState.id;
        Request
            .post(url)
            .send({room_id: roomId, card_id: cardId})
            .then(this.updateRoomStateFromResponse.bind(this))
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

    render(){
        return <div className="view-wrapper">
            <div className="point-bar">
                {this.playerPointUI()}
                {this.unusedPointUI()}
                {this.aiPointUI()}
            </div>
            <div className="wrapper">
                <RushGamePlayer challenger={this.state.roomState.challenger} isClosed={this.state.isClosed} onStartButtonClicked={this.newRoom.bind(this)} onPlayButtonClicked={this.playCard.bind(this)} onRollbackButtonClicked={this.rollback.bind(this)}/>
                <RushGameNetral storage={this.state.roomState.storage} currentCard={this.state.roomState.com_card}/>
                <RushGameAI ai={this.state.roomState.ai} />
            </div>
        </div>
    }
}

React.render(<App />, document.querySelector('#content'))
