import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	hello: true,
};

const helloReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SAY_HELLO:
			console.log(state.hello);
			const updateState = !state.hello;
			return updateObject(state, { hello: updateState });
		default:
			return state;
	}
};

export default helloReducer;
