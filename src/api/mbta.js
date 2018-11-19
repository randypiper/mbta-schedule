const URL = 'http://api-v3.mbta.com';
const KEY = ''; // TODO provide an API key
    
async function getRoutes(stop) {
	return fetch(URL + '/routes?filter[stop]=' + stop + '&api_key=' + KEY);
}

async function getPredictions(stop) {
	return fetch(URL + '/predictions?filter[stop]=' + stop + '&api_key=' + KEY);
}

export { getRoutes, getPredictions };
