import React from 'react';
import GlobalStyles from '../styles/GlobalStyles';
import 'normalize.css';
import styled from 'styled-components';

const LayoutStyles = styled.div`
	.wrapper {
		max-width: 1400px;
		min-height: 100vh;
		margin: 0 auto;
		text-align: center;
		border: 2px solid orangered;
	}
`;

const Layout = ({ children }) => {
	return (
		<LayoutStyles>
			<GlobalStyles />
			<div className="wrapper">{children}</div>
		</LayoutStyles>
	);
};

export default Layout;
