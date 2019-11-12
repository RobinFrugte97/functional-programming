
var projection = d3.geoMercator();
var path = d3.geoPath().projection(projection);
let width = 1900
let height = 700
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
	
	SELECT ?cho ?printName ?placeName ?printImage ?date ?lat ?long WHERE {
  		<https://hdl.handle.net/20.500.11840/termmaster6917> skos:narrower* ?place .
	    ?place skos:prefLabel ?placeName .
  		?place skos:exactMatch/wgs84:lat ?lat .
  		?place skos:exactMatch/wgs84:long ?long .
  		?place skos:exactMatch/gn:parentCountry ?land .

	   VALUES ?type {"prent" "Prent"} .
	   ?cho dc:title ?printName ;
	        dc:type ?type ;
	        dct:spatial ?place ;
	        edm:isShownBy ?printImage ;
  			dct:created ?date .
	}`
    
async function runQuery(queryUrl, query){
	let getData = await fetch(queryUrl + "?query=" + encodeURIComponent(query) + "&format=json")
	.then(async res => {
		let jsonData = await res.json()
		console.log(jsonData.results.bindings);
		
		return data = jsonData.results.bindings
	})	
}

runQuery(queryUrl, query)

d3.json("../src/japan.json").then(topo => {
	d3.select("body").append("svg")
	console.log(topo);
	drawPrints()
	drawChart(topo)
})

function drawChart(topo) {
	console.log("Drawing map of Japan...");
	
	let svg = d3.select("svg")
		.attr("width", width)
		.attr("height", height)
	//Control size and position of Japan within the screen.
	projection
		.scale(2000)
		.translate([-3900, 1800])
	svg.selectAll("path")
		.data(topo.features).enter()
		.append("path")
		.attr("class", "feature")
		.attr("d", path)
		.style("fill", "lightgreen")
	

}

function drawPrints() {
		console.log("Drawing prints on the map..");
	aa = [139.69171, 35.6895];
	bb = [139.69171, 35.6895];
		
        d3.select("svg").selectAll("circle")
			.data([aa, bb]).enter()
			.append("circle")
			// .attr("src", data.printImage)
            .attr("cx", function (d) { console.log(projection(d)); return projection(d)[0]; })
            .attr("cy", function (d) { return projection(d)[1]; })
            .attr("r", "8px")
			.attr("fill", "red")
			
}

        // add states from topojson
        // svg.selectAll("path")
        //     .data(topo.features).enter()
        //     .append("path")
        //     .attr("class", "feature")
        //     .style("fill", "steelblue")
        //     .attr("d", path);

