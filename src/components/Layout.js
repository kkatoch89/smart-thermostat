import React from 'react';
import GlobalStyles from '../styles/GlobalStyles';
import 'normalize.css';
import { connect } from 'react-redux';

import * as actions from '../store/actions/index';

const Layout = (props) => {
	return (
		<>
			<GlobalStyles />
			{props.hello.hello && <h1>Hello!</h1>}
			<button onClick={() => props.onHello()}>Button</button>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		hello: state.hello,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onHello: () => dispatch(actions.hello()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
