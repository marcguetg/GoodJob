'use strict';
if(typeof console === undefined) {
	var console = {log: function() {}};
}


var app = angular.module('App', []);
app.controller('world', function ($scope) {
	$scope.url = localStorage.getItem('url_goodjob');
	window.SCOPE = $scope; // Debug

	$scope.store_url = function(url) {
		console.log(url)
		localStorage.setItem('url_goodjob', url);
		location.reload();
	}

	$scope.get_spreadsheet_value = function() {
		fetch($scope.url)
			.then(
				resp => resp.json()
					.then(
						data => {
							console.log(data);
							$scope.draw(data);
						},
						err => console.log(err)
					),
				err => console.log(err)
			);
	}


	$scope.draw = function(data) {
	let total = data[0][0];
	let value = data[1][0];

	// create data set on our data
	let dataSet = anychart.data.set([value]);

	// set the gauge type
	let gauge = anychart.gauges.linear();
	gauge.data(dataSet);

	// tank creating
	let tank = gauge.tank(0);
	tank.name("Our's to spend");
	tank.color("#70fd2d");
	tank.width("20%");

	// Set axis scale settings
	let scale = gauge.scale();
	scale.minimum(0);
	scale.maximum(total);


	// Add axis with custom labels
	let axis = gauge.axis(0);
	axis.minorTicks(true);
	axis.scale(scale);
	axis.offset('-11%');

	// draw the chart
	gauge.container("container");
	gauge.draw();
	}


	$scope.get_spreadsheet_value();
});
