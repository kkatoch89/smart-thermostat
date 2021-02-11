import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ThermostatDial from './ThermostatDial';

import * as actions from '../store/actions/index';
import useInterval from '../hooks/useInterval';
import LiveChart from '../components/LiveChart';
import ThermostatStyles from '../styles/ThermostatStyles';

const sortSensorData = (sensorDataObj) => {
	return Object.keys(sensorDataObj)
		.sort()
		.map((el) => ({
			[el]: sensorDataObj[el],
		}));
};

const Thermostat = (props) => {
	const {
		onCheckSessionUid,
		onFetchLiveData,
		uid,
		targetUserTemp,
		onChangeStateAPI,
		temperatureReadings,
	} = props;

	const [latestSensorTemp, setLatestSensorTemp] = useState();
	// Check if there is uid stored in session storage (on mount)
	useEffect(() => {
		onCheckSessionUid();
	}, [onCheckSessionUid]);

	useEffect(() => {
		const timestamp = Date.now();
		const timestampStart = moment(timestamp).subtract(60, 'm').format();
		const timestampEnd = moment(timestamp).format();
		onFetchLiveData(timestampStart, timestampEnd, targetUserTemp);
	}, []);

	// Fetch live data every 5 mins
	useInterval(() => {
		const timestamp = Date.now();
		const timestampStart = moment(timestamp).subtract(5, 'm').format();
		const timestampEnd = moment(timestamp).format();
		onFetchLiveData(timestampStart, timestampEnd, targetUserTemp);
		const sortedArr = sortSensorData(temperatureReadings);
		if (sortedArr.length > 0) {
			setLatestSensorTemp(Object.values(sortedArr[sortedArr.length - 1])[0]);
		}
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

	// Create control buttons
	const controlBtns = () => {
		const statesArr = [
			{ slug: 'auto_heat', display: 'Auto' },
			{ slug: 'auto_cool', display: 'Cooling' },
			{ slug: 'auto_standby', display: 'Ventilation' },
			{ slug: 'heat', display: 'Heating' },
		];
		return statesArr.map((state) => {
			return (
				<button
					className={props.thermostatState === state.slug ? 'active' : ''}
					value={state.slug}
					onClick={(e) => props.onChangeStateAPI(e.target.value, props.uid)}
				>
					{state.display}
				</button>
			);
		});
	};

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
				className={props.thermostatState === 'off' ? 'active' : ''}
				type="button"
				value="off"
				onClick={(e) => props.onChangeStateAPI(e.target.value, props.uid)}
			>
				Turn off
			</button>
			<div className="controlsBox">
				<div className="controls targetTempControls">
					<ThermostatDial
						height="270px"
						width="270px"
						targetTemperature={targetUserTemp}
						ambientTemperature={latestSensorTemp}
						hva
					/>
					<div className="setTempButtonsBox">
						<button onClick={props.onIncreaseTemp}>+</button>
						<button onClick={props.onDecreaseTemp}>-</button>
					</div>
				</div>
				<div className="controls stateControls">
					<h2>Thermostat Mode</h2>
					<div className="setStateButtonsBox">{controlBtns()}</div>
				</div>
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
