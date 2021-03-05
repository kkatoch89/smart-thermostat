import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';

import * as actions from '../store/actions/index';
import useInterval from '../hooks/useInterval';
import ThermostatControls from './ThermostatControls';
import LiveChart from '../components/LiveChart';

const ThermostatStyles = styled.div`
	position: relative;
	padding: 2rem 0;
	background: rgba(3, 3, 3, 0.2);
	flex-grow: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	p,
	h1,
	h2 {
		margin: 0;
		margin-bottom: 1rem;
	}
`;

const Thermostat = (props) => {
	const { onFetchLiveData, targetUserTemp } = props;

	const [loading, setLoading] = useState(true);

	// Fetch live data on mount
	useEffect(() => {
		setLoading(true);
		const timestamp = Date.now();
		const timestampStart = moment(timestamp).subtract(60, 'm').format();
		const timestampEnd = moment(timestamp).format();
		onFetchLiveData(timestampStart, timestampEnd, targetUserTemp);
		setLoading(false);
		const loaderTimer = setTimeout(() => {
			setLoading(false);
		}, 500);
		return () => clearTimeout(loaderTimer);
	}, []);

	// Fetch live data every 5 mins
	useInterval(() => {
		const timestamp = Date.now();
		const timestampStart = moment(timestamp).subtract(5, 'm').format();
		const timestampEnd = moment(timestamp).format();
		onFetchLiveData(timestampStart, timestampEnd, targetUserTemp);
	}, 300000);

	return (
		<ThermostatStyles>
			<Switch>
				<Route
					path="/controls"
					render={(props) => (
						<ThermostatControls {...props} loading={loading} />
					)}
				/>
				<Route exact path="/live-chart" component={LiveChart} />
				<Route render={() => <Redirect to="/controls" />} />
			</Switch>
		</ThermostatStyles>
	);
};

const mapStateToProps = (state) => {
	return {
		thermostatState: state.thermostatControls.thermostatState,
		targetUserTemp: state.thermostatControls.setUserTemp,
		latestSensorDataPoint: state.thermostatControls.latestDataPoint,
		uid: state.thermostatControls.uid,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onCheckSessionUid: () => dispatch(actions.checkSessionUid()),
		onFetchLiveData: (timestampStart, timestampEnd, uid) =>
			dispatch(actions.fetchLiveData(timestampStart, timestampEnd, uid)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Thermostat);
