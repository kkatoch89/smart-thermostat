import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	uid: null,
	thermostatState: 'off',
	setUserTemp: 24,
	temperatureReadings: {},
	targetTempLog: {},
	latestDataPoint: null,
};

/**************************************
	STATE
**************************************/

const toggleThermostat = (state, action) => {
	return updateObject(state, { thermostatState: action.newState });
};

const increaseTemp = (state, action) => {
	return updateObject(state, { setUserTemp: state.setUserTemp + 1 });
};

const decreaseTemp = (state, action) => {
	return updateObject(state, { setUserTemp: state.setUserTemp - 1 });
};

/**************************************
	LIVE DATA
**************************************/

const liveTempDataSuccess = (state, action) => {
	const updatedReadings = updateObject(
		state.temperatureReadings,
		action.readings
	);
	return updateObject(state, { temperatureReadings: updatedReadings });
};

// Add Target Temperature at each timestamp
const addTargetTempLog = (state, action) => {
	const updateTargetTempLog = updateObject(
		state.targetTempLog,
		action.newLogEntry
	);
	return updateObject(state, { targetTempLog: updateTargetTempLog });
};

// Add latest live data point
const addLatestDataPoint = (state, action) => {
	return updateObject(state, { latestDataPoint: action.latestDataPoint });
};

/**************************************
	AUTH
**************************************/

const registerSuccess = (state, action) => {
	return updateObject(state, {
		uid: action.uid,
	});
};

const thermostatControlsReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.TOGGLE_THERMOSTAT:
			return toggleThermostat(state, action);
		case actionTypes.INCREASE_TEMP:
			return increaseTemp(state, action);
		case actionTypes.DECREASE_TEMP:
			return decreaseTemp(state, action);
		case actionTypes.REGISTER_SUCCESS:
			return registerSuccess(state, action);
		case actionTypes.LIVE_TEMP_DATA_SUCCESS:
			return liveTempDataSuccess(state, action);
		case actionTypes.ADD_LATEST_DATA_POINT:
			return addLatestDataPoint(state, action);
		case actionTypes.ADD_TARGET_TEMP_LOG:
			return addTargetTempLog(state, action);
		default:
			return state;
	}
};

export default thermostatControlsReducer;
