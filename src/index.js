import React from 'react';
import ReactDOM from 'react-dom';
import ScheduleBoard from './components/ScheduleBoard';
import './index.css';

const NORTH_STATION = "North+Station";
const SOUTH_STATION = "South+Station";

ReactDOM.render(
	<div>
		<ScheduleBoard stop={NORTH_STATION} />
		<ScheduleBoard stop={SOUTH_STATION} />
	</div>, document.getElementById('root'));