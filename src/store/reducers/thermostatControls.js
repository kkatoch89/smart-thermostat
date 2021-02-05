import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	uid: null,
	thermostatState: 'off',
	setUserTemp: 45,
	temperatureReadings: {},
};

/**************************************
	STATE
**************************************/

const toggleThermostat = (state, action) => {
	return updateObject(state, { thermostatState: action.newState });
};

const increaseTemp = (state, action) => {
	console.log('Increase');
	return updateObject(state, { setUserTemp: state.setUserTemp + 1 });
};

const decreaseTemp = (state, action) => {
	return updateObject(state, { setUserTemp: state.setUserTemp - 1 });
};

/**************************************
	LIVE DATA
**************************************/

const liveTempDataSuccess = (state, action) => {
	// console.log({ ...action.readings });
	const updatedReadings = updateObject(
		state.temperatureReadings,
		action.readings
	);
	return updateObject(state, { temperatureReadings: updatedReadings });
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
		default:
			return state;
	}
};

export default thermostatControlsReducer;
