const width = 1900
const height = 800
const queryUrl = "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-08/sparql"
const query = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
	PREFIX dc: <http://purl.org/dc/elements/1.1/>
	PREFIX dct: <http://purl.org/dc/terms/>
	PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
	PREFIX edm: <http://www.europeana.eu/schemas/edm/>
	PREFIX foaf: <http://xmlns.com/foaf/0.1/>
	PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>
	PREFIX gn: <http://www.geonames.org/ontology#>
	
	SELECT ?printName ?placeName ?printImage ?lat ?long WHERE {
  		<https://hdl.handle.net/20.500.11840/termmaster6917> skos:narrower* ?place .
	    ?place skos:prefLabel ?placeName .
  		?place skos:exactMatch/wgs84:lat ?lat .
  		?place skos:exactMatch/wgs84:long ?long .
  		?place skos:exactMatch/gn:parentCountry ?land .

	   VALUES ?type {"prent" "Prent"} .
	   ?cho dc:title ?printName ;
	        dc:type ?type ;
	        dct:spatial ?place ;
	        edm:isShownBy ?printImage .
	}`
d3.json("../src/japan.json").then(topo => {
	d3.select("body").append("svg")
	console.log(topo);
	drawChart(topo)
	drawPrints(topo)
})
    
function fetchData(queryUrl, query){
	fetch(queryUrl + "?query=" + encodeURIComponent(query) + "&format=json")
	.then(res => res.json())
	.then(jsonRes => jsonRes.results.bindings)
	.then(data => data = data.map(cleanData))
}


function drawChart(topo) {
	// console.log("Drawing map of Japan...");
	let svg = d3.select("svg")
		.attr("width", width)
		.attr("height", height)
	svg.selectAll("path")
		.data(topo.features).enter()
		.append("path")
		.attr("class", "feature")
		.attr("d", setChartPosition(topo)[0])
		.style("fill", "lightgreen")
}

function drawPrints(topo) {
	// let data = fetchData(queryUrl, query)
	// console.log(data);
	
	console.log("Drawing prints on the map..");
	//Temporary test coordinates
	aa = [139.69171, 35.6895];
	bb = [139.69171, 35.6895];
	d3.select("svg").selectAll("circle")
		.data([aa, bb]).enter()
		.append("circle")
		// .attr("src", data.printImage)
		.attr("cx", function (d) { console.log(d); return setChartPosition(topo)[1](d)[0] })
		.attr("cy", function (d) { return setChartPosition(topo)[1](d)[1] })
		.attr("r", "8px")
		.attr("fill", "red")
}

function setChartPosition(topo) {
	let projection = d3.geoMercator().scale(150).center(d3.geoCentroid(topo))
		.translate([width / 2, height / 2]);
	let path = d3.geoPath().projection(projection);

	// using the path determine the bounds of the current map and use 
	// these to determine better values for the scale and translation
	let bounds = path.bounds(topo);
	let hscale = 150 * width / (bounds[1][0] - bounds[0][0]);
	let vscale = 150 * height / (bounds[1][1] - bounds[0][1]);
	let scale = (hscale < vscale) ? hscale : vscale;

	// new projection
	projection = d3.geoMercator().center(d3.geoCentroid(topo))
		.scale(scale).translate([width - (bounds[0][0] + bounds[1][0]) / 2,
		height - (bounds[0][1] + bounds[1][1]) / 2]);
	path = path.projection(projection);
	return [path, projection]
}

function cleanData(row) {
	let result = {}
	Object.entries(row)
		.forEach(([key, propValue]) => {
			result[key] = propValue.value
		})
	return result
}