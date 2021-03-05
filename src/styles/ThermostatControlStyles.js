import styled from 'styled-components';

const ThermostatControlStyles = styled.div`
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
	.toggleBtn {
		width: 100px;
		background: rgba(151, 21, 0, 0.7);
		&.active {
			background: rgba(83, 192, 67, 0.7);
		}
	}
	.smartModeIndicator {
		padding: 0 2rem;
		color: rgba(0, 0, 0, 0.5);
		height: 100%;
		display: flex;
		align-items: center;
	}
	.smartActive {
		color: var(--green);
		position: relative;

		&::after {
			width: 200px;
			height: 20px;
			color: var(--white);
			position: absolute;
			bottom: 0;
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

export default ThermostatControlStyles;
