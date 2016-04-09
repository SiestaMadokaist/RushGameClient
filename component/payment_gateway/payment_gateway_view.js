import React from "react";
import Config from "../../config"
import PaymentGatewaySearch from "./payment_gateway_search.js";

class PaymentGatewayView extends React.Component {
    constructor(props){
        console.log(props);
        super(props);
        this.css = {
            border: "1px black solid",
            margin: "5px"
        }
    }

    item(){
        return this.props.item;
    }

    render(){
        return <div style={this.css}>
            <img src={this.item().image}/>
            <div>{this.item().name}</div>
            <div>{this.item().description}</div>
            <div>{this.item().currencies}</div>
            <div>{this.item().rating}</div>
            <div>{this.item().transaction_fees}</div>
            <div><a href={this.item().how_to_url}>quick tutorial here</a></div>
        </div>
    }
}

export default {
    PaymentGatewaySearch: PaymentGatewaySearch,
    PaymentGatewayView: PaymentGatewayView
}
