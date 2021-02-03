import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as actions from '../store/actions/index';

const ThermostatStyles = styled.div`
	position: relative;
	.controls {
		button + button {
			margin-left: 1rem;
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

// Register modal if not registered
// If registered, save uid_hash to state

const Thermostat = (props) => {
	console.log(!!props.uid);
	return (
		<ThermostatStyles>
			<p>{props.uid}</p>
			<button
				className="register"
				onClick={props.onRegisterThermostat}
				disabled={!!props.uid}
			>
				Register Thermostat
			</button>
			<h1>Unit 100 - Thermostat</h1>
			<button onClick={props.onToggleThermostat}>
				Turn {props.thermostatOn ? 'on' : 'off'}
			</button>
			<div className="controls">
				<p>{props.setUserTemp}&#176;</p>
				<button onClick={props.onIncreaseTemp}>+</button>
				<button onClick={props.onDecreaseTemp}>-</button>
			</div>
			<div className="controls">
				<h2>Thermostat Mode</h2>
				<button>Auto</button>
				<button>Cooling</button>
				<button>Heating</button>
				<button>Ventilation</button>
			</div>
		</ThermostatStyles>
	);
};

const mapStateToProps = (state) => {
	return {
		thermostatOn: state.thermostatControls.thermostatOn,
		setUserTemp: state.thermostatControls.setUserTemp,
		uid: state.thermostatControls.uid,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onToggleThermostat: () => dispatch(actions.toggleThermostat()),
		onIncreaseTemp: () => dispatch(actions.increaseTemp()),
		onDecreaseTemp: () => dispatch(actions.decreaseTemp()),
		onRegisterThermostat: () => dispatch(actions.fetchUID()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Thermostat);
