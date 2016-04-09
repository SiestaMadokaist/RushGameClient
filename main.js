import React from 'react';
// import VODUploader from './component/VODUploader';
import {PaymentGatewayView, PaymentGatewaySearch} from "./component/payment_gateway";

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            items: [],
            dataCount: 0,
        }
    }

    updateViewFromSearch(data){
        this.setState({items: data.body.data});
        this.setState({dataCount: data.body.data_count});
    }

    render(){
        const payment_views = this.state.items
            .map(item => <PaymentGatewayView item={item}/>)
        return <div>
            <PaymentGatewaySearch placeholder="try typing vink or veb here" onInputChange={this.updateViewFromSearch.bind(this)} dataCount={this.state.dataCount}/>
            <div>showing {this.state.items.length} item from {this.state.dataCount}</div>
            {payment_views}
        </div>
    }
}

React.render(<App />, document.querySelector('#content'))
