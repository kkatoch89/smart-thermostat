import React from 'react';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import Thermostat from './components/Thermostat';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
	return (
		<Layout>
			<Router>
				<Navbar />
				<Thermostat />
			</Router>
		</Layout>
	);
}

export default App;
