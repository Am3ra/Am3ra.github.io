let context = d3.select("#content canvas").node().getContext("2d");

let projection = d3.geoOrthographic().scale(500).rotate([100, 0]);

let geoGenerator = d3.geoPath().projection(projection).context(context);

function update(geojson) {
	context.lineWidth = 0.5;
	context.strokeStyle = "#333";

	context.beginPath();
	geoGenerator({ type: "FeatureCollection", features: geojson.features });
	context.stroke();

	// Graticule
	let graticule = d3.geoGraticule();
	context.beginPath();
	context.strokeStyle = "#ccc";
	geoGenerator(graticule());
	context.stroke();

	// London - New York
	context.beginPath();
	context.strokeStyle = "red";
	geoGenerator({
		type: "Feature",
		geometry: {
			type: "LineString",
			coordinates: [
				[0.1278, 51.5074],
				[-74.0059, 40.7128],
			],
		},
	});
	context.stroke();

	// Circle
	let circle = d3.geoCircle().center([0.1278, 51.5074]).radius(5);
	context.beginPath();
	context.strokeStyle = "red";
	geoGenerator(circle());
	context.stroke();
}

// REQUEST DATA
d3.json(
	"https://gist.githubusercontent.com/d3indepth/f28e1c3a99ea6d84986f35ac8646fac7/raw/c58cede8dab4673c91a3db702d50f7447b373d98/ne_110m_land.json"
).then(function (json) {
	update(json);
});
