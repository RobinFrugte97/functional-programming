
const queryUrl = "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-08/sparql"
const query = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
	PREFIX dc: <http://purl.org/dc/elements/1.1/>
	PREFIX dct: <http://purl.org/dc/terms/>
	PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
	PREFIX edm: <http://www.europeana.eu/schemas/edm/>
	PREFIX foaf: <http://xmlns.com/foaf/0.1/>
	SELECT ?cho ?printName ?placeName ?printImage ?date WHERE {
  		<https://hdl.handle.net/20.500.11840/termmaster6917> skos:narrower* ?place .
	    ?place skos:prefLabel ?placeName .
	    VALUES ?type {"prent" "Prent"} .
	    ?cho dc:title ?printName ;
	        dc:type ?type ;
	        dct:spatial ?place ;
	        edm:isShownBy ?printImage ;
  			dct:created ?date .
    }`
    
function runQuery(queryUrl, query){
    fetch(queryUrl+"?query="+ encodeURIComponent(query) +"&format=json")
    .then(res => res.json())
    .then(json => {
        data = json.results.bindings
        console.log(data);
        
    })
}

runQuery(queryUrl, query);