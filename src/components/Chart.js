import React, { Component } from 'react';
import axios from 'axios';
import ReactChartkick, { AreaChart } from 'react-chartkick';
import Chart from 'chart.js';

ReactChartkick.addAdapter(Chart);

class CryptoChart extends Component {
	state = {
		data: [],
	}
	componentWillMount() {
		const { ticker } = this.props;
		axios.post(`http://api.etharek.tech/API/transactions/getTransactions`, {
			ticker
		})
			.then((response) => {
				const object = {};
				response.data.map(data => {
					const date = new Date(data.date);
					object[`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`] = data.price;
					
				})
				this.setState({ data: object });
			})
			.catch((error) => console.log(error));
	}
	render() {
		const { data } = this.state;
		return (
			<AreaChart data={data} />
		);
	}
}

export default CryptoChart;