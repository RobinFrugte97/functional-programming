export async function fetchData(queryUrl, query) {
    const res = await fetch(queryUrl + "?query=" + encodeURIComponent(query) + "&format=json")
    const jsonRes = await res.json()
    let data = jsonRes.results.bindings
    return data = data.map(cleanData)
}

//Clean function Laurens
function cleanData(row) {
    let result = {}
    Object.entries(row)
        .forEach(([key, propValue]) => {
            result[key] = propValue.value
        })
    return result
}