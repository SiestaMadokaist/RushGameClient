import React from "react";
import Request from 'superagent';
import Config from "../../config";

const _per_page = 3;
class PaymentGatewaySearch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            query: "",
            page: 1,
        }

        this.css = {
            width: "200px",
            height: "30px"
        }
    }

    updateQueryState(event){
        const stateUpdate = new Promise((resolve, reject) => {
            this.setState({query: event.target.value}, resolve)
        })
        stateUpdate
            .then(this.fuzzySearchRequest.bind(this))
            .then(this.props.onInputChange.bind(this))
    }

    decrementPage(_){
        if(this.state.page < 1) { return }
        const stateUpdate = new Promise((resolve, reject) => {
            this.setState({page: this.state.page - 1}, resolve)
        })
        stateUpdate
            .then(this.fuzzySearchRequest.bind(this))
            .then(this.props.onInputChange.bind(this))
    }

    incrementPage(_){
        if(this.lastPage()) { return }
        const stateUpdate = new Promise((resolve, reject) => {
            this.setState({page: this.state.page + 1}, resolve)
        })
        stateUpdate
            .then(this.fuzzySearchRequest.bind(this))
            .then(this.props.onInputChange.bind(this))
    }

    firstPage(){
        return this.state.page == 1;
    }

    lastPage(){
        return this.props.dataCount <= this.state.page * _per_page;
    }

    fuzzySearchRequest(){
        const url = Config.resources("/payment_gateways/fuzzy_search")
        return Request
            .get(url)
            .query({
                query: this.state.query,
                page: this.state.page
            })
    }

    render(){
        const activeButton = {
            fontSize: "2em",
            cursor: "pointer"
        }

        const inactiveButton = {
            fontSize: "2em",
            cursor: "not-allowed",
            color: "#888"
        }

        const prevCss = this.firstPage() ? inactiveButton : activeButton;
        const nextCss = this.lastPage() ? inactiveButton : activeButton;

        return <div>
            <input placeholder={this.props.placeholder} onChange={this.updateQueryState.bind(this)} style={this.css}></input>
            <div>
                 <span style={prevCss} onClick={this.decrementPage.bind(this)}>&lt;</span>
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <span style={nextCss} onClick={this.incrementPage.bind(this)}>&gt;</span>
            </div>
        </div>
    }

}

export default PaymentGatewaySearch;
