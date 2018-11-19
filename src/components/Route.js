import Moment from 'moment';
import React from 'react';

function getTime(prediction) {
	return prediction.attributes.arrival_time || prediction.attributes.departure_time || '';
}

function predictionTimeSorter(a, b) {
	return getTime(a).localeCompare(getTime(b));
}
	
export default class Route extends React.Component {
	
	render() {
		let route = this.props.route;
		let predictions = this.props.predictions;
		let directionNames = route.attributes.direction_names;
		
		return (
			<div>
				<h3 style={{ color: '#' + route.attributes.color }}>{route.attributes.long_name}</h3>
				<table>
					<thead>
						<tr>
							<th>Time</th>
							<th>Direction</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{ predictions.sort(predictionTimeSorter).map(p => {			
							let time = Moment(getTime(p)).format('hh:mm a');
							let direction = directionNames[p.attributes.direction_id];
							return <tr key={p.id}>			
								<td>{time}</td>
								<td>{direction}</td>
								<td>{p.attributes.status}</td>
							</tr>;
						})}
					</tbody>
				</table>
			</div>);
	}
}
