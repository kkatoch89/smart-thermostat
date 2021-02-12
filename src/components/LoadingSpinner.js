import React from 'react';
import styled from 'styled-components';

const LoadingStyles = styled.div`
	.lds-dual-ring {
		display: inline-block;
		width: 130px;
		height: 130px;
	}
	.lds-dual-ring:after {
		content: ' ';
		display: block;
		width: 120px;
		height: 120px;
		margin: 8px;
		border-radius: 50%;
		border: 10px solid #fff;
		border-color: #fff transparent #fff transparent;
		animation: lds-dual-ring 2s linear infinite;
	}
	@keyframes lds-dual-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

export default function LoadingSpinner() {
	return (
		<LoadingStyles>
			<div className="lds-dual-ring"></div>
		</LoadingStyles>
	);
}
