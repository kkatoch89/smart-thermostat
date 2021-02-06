import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import styled from 'styled-components';

const ChartStyles = styled.div`
	border: solid 2px orangered;
	width: 70%;
	padding: 2rem 0;
	margin: 0 auto;
`;

const LiveChart = (props) => {
	const { temperatureReadings, targetTempLog } = props;
	const [labelArr, setLabelArr] = useState([]);
	const [ambientValueArr, setAmbientValueArr] = useState([]);
	const [targetValueArr, setTargetValueArr] = useState([]);
	useEffect(() => {
		// Sorting live readings based on timestamp
		const sortedArr = Object.keys(temperatureReadings)
			.sort()
			.map((el) => ({
				[el]: temperatureReadings[el],
			}));
		// console.log(
		// 	`testArr: ${JSON.stringify(sortedArr)}`,
		// 	`origArr: ${JSON.stringify(temperatureReadings)}`
		// );

		const labels = [];
		const ambValues = [];
		const targValues = [];
		sortedArr.forEach((el, i) => {
			labels.push(Object.keys(el)[0]);
			ambValues.push(Object.values(el)[0]);
			targValues.push(targetTempLog[Object.keys(el)[0]]);
			// console.log(targetTempLog[Object.keys(el)[0]]);
		});

		setLabelArr(labels);
		setAmbientValueArr(ambValues);
		setTargetValueArr(targValues);
		// console.log(targetValueArr);

		// 1. Create array of labels (timestamps)
		// 2. Create array of values (temp)
		// For ambient temp

		// for (let key in sortedArr) {
		// 	// const myDate = moment(key, 'MMMM Do YYYY, h:mm:ss a').toDate();
		// 	// console.log(myDate);
		// 	setLabelArr((oldArray) => [...oldArray, key]);
		// 	setAmbientValueArr((oldArray) => [...oldArray, temperatureReadings[key]]);
		// }
		// For target temp
		// for (let key in targetTempLog) {
		// 	setTargetValueArr((oldArray) => [...oldArray, targetTempLog[key]]);
		// }
	}, [temperatureReadings]);

	// 3. Inject array of labels and values into LiveChart
	const data = {
		labels: labelArr,
		datasets: [
			{
				label: 'Ambient Temperature',
				fill: false,
				lineTension: 0.5,
				backgroundColor: 'rgba(123, 116, 187, 1)',
				borderColor: 'rgba(123, 116, 187, 1)',
				borderWidth: 2,
				data: ambientValueArr,
				pointRadius: 0,
			},
			{
				label: 'Target Temperature',
				fill: false,
				lineTension: 0.5,
				backgroundColor: 'rgba(224, 142, 59,1)',
				borderColor: 'rgba(224, 142, 59, 1)',
				borderWidth: 2,
				data: targetValueArr,
				pointRadius: 0,
			},
		],
	};
	return (
		<ChartStyles>
			<Line
				data={data}
				options={{
					title: {
						display: true,
						text: 'Temperature',
						fontSize: 20,
					},
					scales: {
						yAxes: [
							{
								ticks: {
									min: 0,
									suggestedMax: 30,
									stepSize: 5,
									callback: function (value) {
										return `${value}°`;
									},
								},
							},
						],
						xAxes: [
							{
								ticks: {
									maxRotation: 90,
									minRotation: 90,
								},
							},
						],
					},
					legend: {
						display: true,
						position: 'top',
					},
				}}
			/>
		</ChartStyles>
	);
};

const mapStateToProps = (state) => {
	return {
		thermostatState: state.thermostatControls.thermostatState,
		setUserTemp: state.thermostatControls.setUserTemp,
		uid: state.thermostatControls.uid,
		temperatureReadings: state.thermostatControls.temperatureReadings,
		targetTempLog: state.thermostatControls.targetTempLog,
	};
};

export default connect(mapStateToProps)(LiveChart);
