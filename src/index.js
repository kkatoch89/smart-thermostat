import React from 'react';
import ReactDOM from 'react-dom';
import {
	createStore,
	compose,
	applyMiddleware,
	combineReducers,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import App from './App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import thermostatControlsReducer from './store/reducers/thermostatControls';

let composeEnhancers = null;
if (process.env.NODE_ENV === 'development') {
	composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} else {
	composeEnhancers = compose;
}

const rootReducer = combineReducers({
	thermostatControls: thermostatControlsReducer,
});

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
