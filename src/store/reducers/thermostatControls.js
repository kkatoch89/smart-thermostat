import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	uid: null,
	thermostatOn: false,
	setUserTemp: 45,
};

const toggleThermostat = (state, action) => {
	const updateElement = !state.thermostatOn;
	return updateObject(state, { thermostatOn: updateElement });
};

const increaseTemp = (state, action) => {
	console.log('Increase');
	return updateObject(state, { setUserTemp: state.setUserTemp + 1 });
};

const decreaseTemp = (state, action) => {
	return updateObject(state, { setUserTemp: state.setUserTemp - 1 });
};

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
		default:
			return state;
	}
};

export default thermostatControlsReducer;
