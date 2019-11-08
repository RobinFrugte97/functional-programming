# Functional programming

The goal of this course is to use d3 to clean data and make a dynamic representation (data visualisarion); data is functionally transformed to a visualisation of museum objects from [NMVW](http://collectie.wereldculturen.nl/).


# Prints

![](https://github.com/RobinFrugte97/functional-programming/raw/master/src/images/schetsPrentenJapan.jpg)

My concept is about prints. The museum has a lot of different prints from all over the world. I liked the idea of plotting the prints on a map. Most prints originate from Japan so I decided to focus specificly on Japan. I want to use the coordinates of each print to plot them on a map of Japan.

## Get started

Install the dependencies...

```bash
cd app
npm install
```

...then start the app:

```bash
nodemon server.js
```

Navigate to [localhost:8080](http://localhost:8080). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost.


## Data

The data I'm using comes from the API of [Netwerk digitaal erfgoed](https://www.netwerkdigitaalerfgoed.nl/), with my unique URL: https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-08/sparql

I'm gathering data about all prints in Japan to then plot them on a map of Japan to see where in Japan most prints originate from.

I'm getting the following data:
- Print name
- The date the print was created
- The geographic location in longitude and latitude
- The place name the print originates from
- The image of the print

The query I'm using: 

```
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
	}
```