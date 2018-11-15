import React from 'react';
import Route from './Route';
import { getRoutes, getPredictions } from '../api/mbta';

export default class ScheduleBoard extends React.Component {
	constructor() {
		super();
		this.state = {
			routes: [],
		};
	}

	async componentDidMount() {
		let stop = this.props.stop;
		let routes = getRoutes(stop);
		let predictions = getPredictions(stop);
		
		let predictionsByRoute = this.groupPredictionsByRoute(
			await this.getResponseJson(predictions),
			this.normalizeRoutes(await this.getResponseJson(routes))
		);
		
		this.setState({
			routes: predictionsByRoute
		});
	}
	
	async getResponseJson(responsePromise) {
		let response = await responsePromise;
		return response.json();
	}
	
	normalizeRoutes(routes) {
		let normalized = {};
		for (let route of routes.data) {
			normalized[route.id] = route;
		}
		return normalized;
	}
	
	groupPredictionsByRoute(predictions, routes) {
		let predictionsByRoute = {};
		for (let prediction of predictions.data) {
			let routeId = prediction.relationships.route.data.id;
			let route = predictionsByRoute[routeId];
			if (!route) {
				route = {
					route: routes[routeId],
					predictions: []
				};
				predictionsByRoute[routeId] = route;
			}
			route.predictions.push(prediction);
		}
		return Object.values(predictionsByRoute);
	}
	
	render() {
		return (
			<div>
				<h2>{this.props.stop.split('+').join(' ')}</h2>
				{ this.state.routes.map((routeWithPredictions) => {
					return <Route key={routeWithPredictions.route.id} route={routeWithPredictions.route} predictions={routeWithPredictions.predictions} />;
				})}
			</div>
		);
	}
}
