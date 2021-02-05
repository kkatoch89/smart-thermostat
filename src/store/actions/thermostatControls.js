import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

/**************************************
	CHANGE STATE
**************************************/

export const toggleThermostat = (newState) => {
	return {
		type: actionTypes.TOGGLE_THERMOSTAT,
		newState: newState,
	};
};

// Patch new state
export const changeStateAPI = (newState, uid) => {
	return (dispatch) => {
		axios
			.patch(`/thermostat/${uid}/`, { state: newState })
			.then(({ data }) => {
				// If patch successful, update state
				dispatch(toggleThermostat(data.state));
				console.log(data, newState);
			})
			.catch((err) => {
				console.log(err.message);
			});
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

/**************************************
	RETREIVE LIVE DATA
**************************************/

// Add successfully fetched datapoints to state
export const liveTempDataSuccess = (readings) => {
	return {
		type: actionTypes.LIVE_TEMP_DATA_SUCCESS,
		readings: { ...readings },
	};
};

// Fetch live data
export const fetchLiveData = (timestampStart, timestampEnd, uid) => {
	return (dispatch) => {
		axios
			.get(`sensors/temperature-1/?begin=${timestampStart}&end=${timestampEnd}`)
			.then(({ data }) => {
				// console.log(data);
				const tempData = {};
				data.data_points.forEach((el) => {
					return (tempData[el.timestamp] = el.value);
				});
				dispatch(liveTempDataSuccess(tempData));
			})
			.catch((error) => {
				console.log(error.message);
			});
	};
};

/**************************************
	AUTH
**************************************/

// Save uid to state if successfully registered
export const registerSuccess = (uid) => {
	return {
		type: actionTypes.REGISTER_SUCCESS,
		uid: uid,
	};
};

// Checking if uid on session storage or not
export const checkSessionUid = () => {
	console.log('Checking UID');
	return (dispatch) => {
		const sessionUid = localStorage.getItem('uid');
		if (!!sessionUid) {
			dispatch(registerSuccess(sessionUid));
		}
	};
};

// Fetch uid
export const fetchUID = () => {
	return (dispatch) => {
		const sessionUid = localStorage.getItem('uid');
		if (sessionUid) {
			dispatch(registerSuccess(sessionUid));
		} else {
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
		}
	};
};
