import styled from 'styled-components';

const ThermostatStyles = styled.div`
	position: relative;
	padding: 2rem 0;
	background: rgba(3, 3, 3, 0.2);
	p,
	h1,
	h2 {
		margin: 0;
		margin-bottom: 1rem;
	}
	.controlsBox {
		padding: 4rem 6rem;
		display: grid;
		grid-template-columns: 1fr 400px 400px 1fr;
		grid-template-areas: '. targetTempControls stateControls .';
		gap: 4rem;
	}
	.setStateButtonsBox {
		height: 80%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		button {
			width: 150px;
		}
		button + button {
			margin-top: 2rem;
		}
	}
	.controls {
		padding: 2rem 0;
	}
	.targetTempControls {
		grid-area: targetTempControls;
		width: 400px;
		min-height: 325px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.setTempButtonsBox {
		display: flex;
		justify-content: space-evenly;
		margin-top: 2rem;
		button {
			width: 50px;
			font-size: 2rem;
			&:active {
				background: var(--green);
			}
		}
		button + button {
			margin-left: 1rem;
		}
	}
	.stateControls {
		grid-area: stateControls;
		width: 400px;
		border: 2px solid white;
		border-radius: 3px;
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
	.active {
		background: var(--green);
		font-weight: bolder;
	}
`;

export default ThermostatStyles;
