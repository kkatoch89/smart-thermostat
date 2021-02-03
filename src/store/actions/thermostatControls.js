import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const toggleThermostat = () => {
	return {
		type: actionTypes.TOGGLE_THERMOSTAT,
	};
};

export const increaseTemp = () => {
	return {
		type: actionTypes.INCREASE_TEMP,
	};
};

export const decreaseTemp = () => {
	return {
		type: actionTypes.DECREASE_TEMP,
	};
};

export const registerSuccess = (uid) => {
	return {
		type: actionTypes.REGISTER_SUCCESS,
		uid: uid,
	};
};

export const fetchUID = () => {
	return (dispatch) => {
		axios
			.post('/thermostat/register/')
			.then(({ data }) => {
				console.log(data);
				localStorage.setItem('uid', data.uid_hash);
				dispatch(registerSuccess(data.uid_hash));
			})
			.catch((error) => {
				console.log(error.message);
			});
	};
};
