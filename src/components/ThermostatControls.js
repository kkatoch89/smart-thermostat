import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions/index';
import ThermostatControlStyles from '../styles/ThermostatControlStyles';
import LoadingSpinner from './LoadingSpinner';
import ThermostatDial from './ThermostatDial';

const ThermostatControls = (props) => {
	const {
		targetUserTemp,
		onChangeStateAPI,
		latestSensorDataPoint,
		uid,
		thermostatState,
		loading,
		onRegisterThermostat,
		onCheckSessionUid,
	} = props;

	const [smartMode, setSmartMode] = useState(false);

	// Check if there is uid stored in session storage (on mount)
	useEffect(() => {
		onCheckSessionUid();
	}, [onCheckSessionUid]);

	// Setting state to auto_heat or auto_cool when user adjusts target temp
	useEffect(() => {
		const autoStateChange = () => {
			if (targetUserTemp > latestSensorDataPoint) {
				onChangeStateAPI('heat', uid);
			}
			if (targetUserTemp < latestSensorDataPoint) {
				onChangeStateAPI('auto_cool', uid);
			}
			if (targetUserTemp === latestSensorDataPoint) {
				onChangeStateAPI('auto_standby', uid);
			}
			if (smartMode) {
				onChangeStateAPI('auto_heat', uid);
			}
		};
		if (uid) {
			autoStateChange();
		}
	}, [targetUserTemp, onChangeStateAPI]);

	// Toggle Smart Mode
	const smartModeBtnHandler = () => {
		if (thermostatState !== 'off') {
			return setSmartMode(!smartMode);
		}
	};
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
					key={state.slug}
					className={thermostatState === state.slug ? 'active' : ''}
					value={state.slug}
					onClick={(e) => onChangeStateAPI(e.target.value, props.uid)}
				>
					{state.display}
				</button>
			);
		});
	};
	return (
		<ThermostatControlStyles>
			<button
				className="register"
				onClick={onRegisterThermostat}
				disabled={!!uid}
			>
				Register Thermostat
			</button>
			<h1>Unit 100 - Thermostat</h1>
			<button
				className={thermostatState === 'off' ? 'toggleBtn' : 'toggleBtn active'}
				type="button"
				value={thermostatState === 'off' ? 'auto_heat' : 'off'}
				onClick={(e) => {
					setSmartMode(false);
					onChangeStateAPI(e.target.value, uid);
				}}
			>
				{`${thermostatState === 'off' ? 'Off' : 'On'}`}
			</button>
			<div className="controlsBox">
				<div className="controls targetTempControls">
					{loading ? (
						<LoadingSpinner />
					) : (
						<>
							<ThermostatDial
								height="270px"
								width="270px"
								targetTemperature={targetUserTemp}
								ambientTemperature={latestSensorDataPoint}
								hvacMode={thermostatState}
								off={thermostatState === 'off' ? true : false}
								leaf={thermostatState === 'auto_heat'}
							/>
							<div className="setTempButtonsBox">
								<button onClick={props.onIncreaseTemp}>+</button>
								<p
									className={
										smartMode || thermostatState === 'auto_heat'
											? 'smartModeIndicator smartActive'
											: 'smartModeIndicator'
									}
									onClick={smartModeBtnHandler}
								>
									Smart Mode -{' '}
									{smartMode || thermostatState === 'auto_heat' ? 'On' : 'Off'}
								</p>
								<button onClick={props.onDecreaseTemp}>-</button>
							</div>
						</>
					)}
				</div>
				<div className="controls stateControls">
					<h2>Thermostat Mode</h2>
					<div className="setStateButtonsBox">{controlBtns()}</div>
				</div>
			</div>
		</ThermostatControlStyles>
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

export default connect(mapStateToProps, mapDispatchToProps)(ThermostatControls);
