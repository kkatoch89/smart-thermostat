import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavBarStyles = styled.nav`
	background: var(--blue);
	ul {
		margin: 0;
		padding: 2rem 0;
		display: flex;
		justify-content: space-around;
	}
	li {
		list-style: none;
	}
	a {
		text-decoration: none;
		color: var(--white);
	}
	.selected {
		border-bottom: 4px solid var(--white);
	}
`;

function Navbar() {
	return (
		<NavBarStyles>
			<ul>
				<li>
					<NavLink to="/controls" activeClassName="selected">
						Controls
					</NavLink>
				</li>
				<li>
					<NavLink to="/live-chart" activeClassName="selected">
						Live Chart
					</NavLink>
				</li>
			</ul>
		</NavBarStyles>
	);
}

export default Navbar;
