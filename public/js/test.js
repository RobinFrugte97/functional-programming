// set projection
var projection = d3.geoMercator();

// create path variable
var path = d3.geoPath()
    .projection(projection);
let width = 1900
let height = 700
console.log(path)
d3.json("../src/japan.json").then(topo => {
    console.log(topo);
    drawChart(topo)
})

function drawChart(topo) {
    let svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
    projection
        .scale(2000)
        .translate([-3900, 1800])
    let paths = svg.selectAll("path")
        .data(topo.features).enter()
        .append("path")
        .attr("class", "feature")
        .attr("d", path)
        .style("fill", "lightgreen")
}

        // add states from topojson
        // svg.selectAll("path")
        //     .data(topo.features).enter()
        //     .append("path")
        //     .attr("class", "feature")
        //     .style("fill", "steelblue")
        //     .attr("d", path);
        
        // add circles to svg
        // svg.selectAll("circle")
        //     .data([aa, bb]).enter()
        //     .append("circle")
        //     .attr("cx", function (d) { console.log(projection(d)); return projection(d)[0]; })
        //     .attr("cy", function (d) { return projection(d)[1]; })
        //     .attr("r", "8px")
        //     .attr("fill", "red")