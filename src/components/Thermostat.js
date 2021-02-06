import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';

import * as actions from '../store/actions/index';
import useInterval from '../hooks/useInterval';
import LiveChart from '../components/LiveChart';

const ThermostatStyles = styled.div`
	position: relative;
	p,
	h2 {
		margin: 0;
		margin-bottom: 1rem;
	}
	.controls {
		border: solid 2px orangered;
		padding: 2rem 0;
		button + button {
			margin-left: 1rem;
		}
	}
	.targetTempControls {
		button {
			width: 50px;
			font-size: 2rem;
		}
	}
	.stateControls {
		button {
			width: 150px;
		}
	}
	.register {
		position: absolute;
		right: 20px;
	}
	& > * {
		&[disabled] {
			pointer-events: none;
			color: var(--grey);
			filter: grayscale(75%);
		}
	}
`;

const Thermostat = (props) => {
	const {
		onCheckSessionUid,
		onFetchLiveData,
		uid,
		targetUserTemp,
		onChangeStateAPI,
	} = props;

	// Difference between target temp and measured temp
	const [tempDelta, setTempDelta] = useState();

	// Check if there is uid stored in session storage (on mount)
	useEffect(() => {
		onCheckSessionUid();
		const timestamp = Date.now();
		const timestampStart = moment(timestamp).subtract(20, 'm').format();
		const timestampEnd = moment(timestamp).format();
		onFetchLiveData(timestampStart, timestampEnd, targetUserTemp);
	}, []);

	// Fetch live data every 5 mins
	useInterval(() => {
		const timestamp = Date.now();
		const timestampStart = moment(timestamp).subtract(5, 'm').format();
		const timestampEnd = moment(timestamp).format();
		onFetchLiveData(timestampStart, timestampEnd, targetUserTemp);
	}, 300000);

	// Setting state to auto_heat or auto_cool when user adjusts target temp
	useEffect(() => {
		const currTempReading =
			props.temperatureReadings[Object.keys(props.temperatureReadings)[0]];
		if (targetUserTemp > currTempReading) {
			onChangeStateAPI('auto_heat', uid);
		}
		if (targetUserTemp < currTempReading) {
			onChangeStateAPI('auto_cool', uid);
		}
		if (targetUserTemp === currTempReading) {
			onChangeStateAPI('auto_standby', uid);
		}
	}, [targetUserTemp, onChangeStateAPI, uid]);

	return (
		<ThermostatStyles>
			<button
				className="register"
				onClick={props.onRegisterThermostat}
				disabled={!!props.uid}
			>
				Register Thermostat
			</button>
			<h1>Unit 100 - Thermostat</h1>
			<button
				type="button"
				value="off"
				onClick={(e) => props.onChangeStateAPI(e.target.value, props.uid)}
			>
				Turn off
			</button>
			<div className="controls targetTempControls">
				<p>{props.targetUserTemp}&#176;</p>
				<button onClick={props.onIncreaseTemp}>+</button>
				<button onClick={props.onDecreaseTemp}>-</button>
			</div>
			<div className="controls stateControls">
				<h2>Thermostat Mode</h2>
				<button
					value="auto_heat"
					onClick={(e) => props.onChangeStateAPI(e.target.value, props.uid)}
				>
					Auto
				</button>
				<button
					value="auto_cool"
					onClick={(e) => props.onChangeStateAPI(e.target.value, props.uid)}
				>
					Cooling
				</button>
				<button
					value="heat"
					onClick={(e) => props.onChangeStateAPI(e.target.value, props.uid)}
				>
					Heating
				</button>
				<button
					value="auto_standby"
					onClick={(e) => props.onChangeStateAPI(e.target.value, props.uid)}
				>
					Ventilation
				</button>
			</div>
			<LiveChart />
		</ThermostatStyles>
	);
};

const mapStateToProps = (state) => {
	return {
		thermostatState: state.thermostatControls.thermostatState,
		targetUserTemp: state.thermostatControls.setUserTemp,
		uid: state.thermostatControls.uid,
		temperatureReadings: state.thermostatControls.temperatureReadings,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onIncreaseTemp: () => dispatch(actions.increaseTemp()),
		onDecreaseTemp: () => dispatch(actions.decreaseTemp()),
		onRegisterThermostat: () => dispatch(actions.fetchUID()),
		onCheckSessionUid: () => dispatch(actions.checkSessionUid()),
		onChangeStateAPI: (newState, uid) =>
			dispatch(actions.changeStateAPI(newState, uid)),
		onFetchLiveData: (timestampStart, timestampEnd, uid) =>
			dispatch(actions.fetchLiveData(timestampStart, timestampEnd, uid)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Thermostat);
