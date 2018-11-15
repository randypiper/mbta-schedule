const URL = 'http://api-v3.mbta.com'

async function getRoutes(stop) {
	return fetch(URL + '/routes?filter[stop]=' + stop);
}

async function getPredictions(stop) {
	return fetch(URL + '/predictions?filter[stop]=' + stop);
}

export { getRoutes, getPredictions };
